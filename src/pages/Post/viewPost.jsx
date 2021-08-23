import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';

import utils from '../../components/Common/index';

import axios from 'axios';
import TagList from '../../components/Common/tagList';
import Faq from '../../components/CareerTeach/FAQ';
import ReviewList from '../../components/CareerTeach/ReviesList';

import '../../css/cardDetail/cardDetail.css';

const { classReplacer, getDate } = utils;

const ViewPost = ({ profile, profileHandler, isLogin, loginType, accessToken, isInfo }) => {
  const ref = useRef();
  const { id, model } = useParams();
  const [card, cardHandler] = useState({});
  const [isTerminated, toggleTerminate] = useState(false);
  // 공유모달
  const [enableModal, modalToggler] = useState(false);

  // 신청 완료 모달
  const [isReservationReq, isRequestHandler] = useState(false);

  // 신청 성공여부 저장
  const [isSucceed, toggleSucceed] = useState(false);

  const naverShare = async () => {
    const { href } = window.location;
    // https://share.naver.com/web/shareView?url=인코딩한URL값&title=인코딩한title값
    const url = encodeURI(encodeURIComponent(href.concat(`/career/${model === 'info' ? 'info' : 'teach'}/${id}`)));
    const title = encodeURI(card.title);
    window.open(`https://share.naver.com/web/shareView?url=${url}&title=${title}`, 'popoup',
              `toolbar=no, location=no, status=no,
              menubar=no, scrollbars=no, resizable=no,
              width=400, height=500`);
  };

  const facebookShare = () => {
    const { href } = window.location;
    // https://share.naver.com/web/shareView?url=인코딩한URL값&title=인코딩한title값
    const url = href.concat(`/career/${model === 'info' ? 'info' : 'teach'}/${id}`);

    window.FB.ui({
      method: 'share',
      href: url
    }, function (response) {

    });
  };

  const copyUrl = () => {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    alert('클립보드로 복사되었습니다.');
  };

  const requestReservation = async () => {
    const url = process.env.REACT_APP_NODE_ENV === 'development'
      ? 'https://localhost:4000/reserve'
      : 'https://back.artoring.com/reserve';

    try {
      if (isTerminated) throw new Error();
      await axios.post(url, { cardId: card._id, userId: profile._id, loginType, reservationType: model }, {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });
      console.log(isTerminated);
      // 예약 완료 모달 생
      isRequestHandler(true);
      toggleSucceed(true);
      console.log('done');
    } catch (e) {
      isRequestHandler(true);
      toggleSucceed(false);
    }
  };
  // 로그인이 안되어 있으면 profile에 likedCareerEdu가 없다
  // 로그인이 되어있다면 상세 정보 렌더링 대상의 카드의 id를 바탕으로 유저가 좋아요를 누른 리스트에
  // 포함되어 있는지를 확인한다.
  // String은 inludes 넘버타입으로 형변환이 이뤄지지 않는다.

  const [likes, likesHandler] = useState(false);

  const history = useHistory();

  const likeHandler = async () => {
    // 로그인이 안되어있다면 당연히 로그인먼저 하라고 리디렉트 해야 한다
    if (!isLogin) history.push('/login');
    else {
      // 환경변수에 따라 요청을 보내야 하는 주소가 달라짐
      const uri = process.env.REACT_APP_NODE_ENV === 'development'
        ? 'https://localhost:4000'
        : 'https://back.artoring.com';

      // 좋아요 여부에 따라 좋아요 등록/삭제가 이뤄지게 된다
      likes
        ? await axios.delete(uri.concat(`/likes/${model === 'teach' || model === 'mentor' ? 'teach' : 'info'}/${card._id}?type=${loginType}&id=${profile._id}`), {
            headers: {
              authorization: `Bearer ${accessToken}`
            }
          })
        : await axios.post(uri.concat(`/likes/${model === 'teach' || model === 'mentor' ? 'teach' : 'info'}`), {
          type: loginType,
          targetId: card._id,
          _id: profile._id,
          targetModel: model
        }, {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        });

      /*
      let likedCareerEdu = profile.likedCareerEdu;

      if (likes) {
        // 좋아요를 눌렀다면 유저의 좋아요 목록에서 splice로 해당 항목 삭제
        const pos = profile.likedCareerEdu.indexOf(card._id);
        profile.likedCareerEdu.splice(pos, 1);

        likedCareerEdu = profile.likedCareerEdu;
        cardHandler({ ...card, likesCount: card.likesCount - 1 });
      } else {
        // 좋아요가 안되어 있다면 유저의 좋아요 목록에 등록
        likedCareerEdu.push(card._id);
        cardHandler({ ...card, likesCount: card.likesCount + 1 });
      }

      profileHandler({ ...profile, likedCareerEdu });
      likesHandler(!likes); */

      const likedList = model === 'teach' || model === 'mentor'
        ? profile.likedCareerEdu
        : profile.likedInfo;
      if (likes) {
        const pos = likedList.indexOf(card._id);
        likedList.splice(pos, 1);

        cardHandler({ ...card, likesCount: card.likesCount - 1 });
      } else {
        likedList.push(card._id);
        cardHandler({ ...card, likesCount: card.likesCount + 1 });
      }

      if ((model === 'teach' || model === 'mentor') && profile.likedCareerEdu) {
        profileHandler({ ...profile, likedCareerEdu: likedList });
        likesHandler(!likes);
      } else if (model === 'info' && profile.likedInfo) {
        profileHandler({ ...profile, likedInfo: likedList });
        likesHandler(!likes);
      }
    }
  };

  // 모달창 밖과을 눌렀을때 모당창을 닥기위함
  // 동시에 모달창 내부에서는 반드시 X 버튼을 눌러야 한다.
  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (enableModal && ref.current && !ref.current.contains(e.target)) {
        modalToggler(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [enableModal]);

  // 보여줘야할 카드의 상세정보를 요청. 페이지 렌더링시 단 한번만 실행된다.
  useEffect(() => {
    async function getCardInfo () {
      const url = process.env.REACT_APP_NODE_ENV === 'development'
        ? `https://localhost:4000/career/${model === 'info' ? 'info' : 'teach'}/${id}`
        : `https://back.artoring.com/career/${model === 'info' ? 'info' : 'teach'}/${id}`;
      const { data } = await axios.get(url);

      cardHandler(data);

      // 신청 가능여부 판단. 카드뉴스일때는 필요가 없음
      if (model === 'teach' || model === 'mentor') {
        const current = new Date();
        const startDate = new Date(data.startDate);

        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);

        const tDate = new Date(startDate.getTime() - 1000 * 3600 * 24);
        if (tDate <= current) toggleTerminate(true);
      }
      if (model === 'teach' && profile.likedCareerEdu) likesHandler(profile.likedCareerEdu.includes(data._id));
      else if (model === 'mentor' && profile.likedMentor) likesHandler(profile.likedMentor.includes(data._id));
      else if (model === 'info' && profile.likedInfo) likesHandler(profile.likedInfo.includes(data._id));
    }

    getCardInfo();
  }, []);

  useEffect(() => {
    const cont = document.getElementById('create-kakao-link-btn');
    if (cont) {
      window.Kakao.Link.createDefaultButton({
        container: cont,
        objectType: 'feed',
        content: {
          title: card.title,
          description: card.detailInfo,
          imageUrl: '',
          link: {
            mobileWebUrl: `https://localhost:3000/career/${model === 'info' ? 'info' : 'teach'}/${id}`
          }
        },
        buttons: [
          {
            title: '웹으로 이동',
            link: {
              mobileWebUrl: `https://localhost:3000/career/${model === 'info' ? 'info' : 'teach'}/${id}`
            }
          }

        ]
      }
      );
    }
  });
  return !isInfo
    ? !card.title
        ? <div style={{ minWidth: '99vw', minHeight: '99vh' }} className='Flex JustifyCenter AlignCenter'>
          <div>  </div>
        </div>
        : <div className='CareerTeachContainer'>
          {!isReservationReq
            ? <div
                className='ReservationModelContainer Flex-Col AlignCenter JustifyCenter'
                style={{ zIndex: -1, minWidth: '100vw', minHeight: '100vh', backgroundColor: 'rgba(0,0,0,0)' }}
              />
            : <div
                className='ReservationModelContainer Flex-Col AlignCenter JustifyCenter'
                style={{ minWidth: '100vw', minHeight: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.208)' }}
              >
              <div className='ReseveModal Flex-Col AlignCenter'>
                <img src={process.env.PUBLIC_URL + '/img/shinyLogo.png'} alt='로고' className='ReserveImg' />
                <div className='body2'>{isSucceed ? '예약이 완료되었어요!' : isTerminated ? '신청기간이 지났습니다' : '예약에 실패했습니다...'}</div>
                <div className='body2'>{isSucceed ? '아래 버튼을 누르면 예약 확인 페이지로 이동합니다!' : ''}</div>
                <div className='BtnType5 ReservationBtn' onClick={isSucceed ? () => history.push('/user/reserve') : () => isRequestHandler(false)}>
                  닫기
                </div>
              </div>
            </div>}
          <div
            className={enableModal ? 'ModalContainer Flex JustifyCenter' : 'ModalContainer ModalHidden Flex JustifyCenter'}
          >
            <div className='ShareModal' ref={ref}>
              <div className='ModalTop Flex'>
                <div className='ModalTitle'>공유하기</div>
                <div className='ModalExit' onClick={() => modalToggler(false)}>&#88;</div>
              </div>
              <div className='Flex JustifyCenter'>
                <a id='create-kakao-link-btn'>
                  <img
                    src='https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png'
                    alt='kakaoShare'
                    className='ModalShareBtns'
                  />
                </a>
                <div className='create-naver-link-btn'>
                  <img
                    src={process.env.PUBLIC_URL + '/img/naver_square.png'}
                    alt='naverShare'
                    onClick={naverShare}
                    className='ModalShareBtns'
                  />
                </div>
                <div className='create-facebook-link-btn'>
                  <img
                    src={process.env.PUBLIC_URL + '/img/facebook_logo.png'}
                    alt='facebookShare'
                    onClick={facebookShare}
                    className='ModalShareBtns'
                  />
                </div>
                <div className='create-url-link-btn'>
                  <img
                    src={process.env.PUBLIC_URL + '/img/url.svg'}
                    alt='copyUrl'
                    onClick={copyUrl}
                    className='ModalShareBtns'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='CareerTeachHeader Flex'>
            <img src={card.thumb} alt='Card Thumbnail' className='CareerTeachHeaderImg' />
            <div className='CareerTeachHeaderDesc'>
              <div className='Flex'>
                <TagList tags={card.tags} />
              </div>
              <div className='Title3 CareerTeachHeaderTitle'>
                {card.title}
              </div>
              <div className='CareerTeachHeaderDate Title5'>
                {utils.getDate(card.startDate) + ' - ' + utils.getDate(card.endDate)}
              </div>
              <div className='CareerTeachHeaderPrice Title5'>{card.price} 원</div>
              <div className='Flex'>

                {profile.verifiedEmail === true
                  ? <div
                      className={!isTerminated ? 'ParticipateUpper BtnType5' : 'ParticipateUpperDisabled'}
                      onMouseDown={(e) => !isTerminated ? classReplacer('.ParticipateUpper', 'ParticipateUpper BtnType5 Btn5Active') : ''}
                      onMouseUp={(e) => !isTerminated ? classReplacer('.ParticipateUpper', 'ParticipateUpper BtnType5') : ''}
                      onClick={requestReservation}
                    >신청하기
                    </div>
                  : <div className='ParticipateUpperDisabled'>신청하기</div>}

                {
                profile.verifiedEmail === true
                  ? <div className='Flex'>
                    <div
                      className={!likes ? 'LikesUpper BtnType6 Flex' : 'LikesUpper BtnType6 Btn6Active Flex'}
                      onClick={likeHandler}
                    >
                      <img src={process.env.PUBLIC_URL + '/img/like.svg'} alt='likeImg' className='LikeImg' />
                      <div id='test'>{card.likesCount}</div>

                    </div>
                    <img src={process.env.PUBLIC_URL + '/img/share.svg'} alt='shareBtn' className='ShareBtn' onClick={() => modalToggler(true)} />
                    </div>
                  : <div className='Flex'><div
                      className='LikesUpperDisabled '
                      onClick={likeHandler}
                                          >
                    <img src={process.env.PUBLIC_URL + '/img/like.svg'} alt='likeImg' className='LikeImg' />
                    <div id='test'>{card.likesCount}</div>

                                          </div>
                    <img src={process.env.PUBLIC_URL + '/img/share.svg'} alt='shareBtn' className='ShareBtn' />
                  </div>
}
              </div>
            </div>
          </div>
          <div className='CareerTeachMiddelUI Flex AlignCenter'>
            <div className='MiddleUiInner Flex'>
              <a href='#ModeratorIntro' className='MiddleUiBtn Title5'>강연자 소개</a>
              <a href='#TeachDetail' className='MiddleUiBtn Title5'>상세정보</a>
              <a href='#Reviews' className='MiddleUiBtn Title5'>프로그램 후기</a>
              <a href='#FAQ' className='MiddleUiBtn Title5'>FAQ</a>
            </div>
            <div className='Flex'>
              {profile.verifiedEmail === true
                ? <div
                    className={!isTerminated ? 'ParticipateUpper BtnType5' : 'ParticipateUpperDisabled'}
                    onMouseDown={(e) => !isTerminated ? classReplacer('.ParticipateLower', 'ParticipateLower BtnType5 Btn5Active') : ''}
                    onMouseUp={(e) => !isTerminated ? classReplacer('.ParticipateLower', 'ParticipateLower BtnType5') : ''}
                    onClick={requestReservation}
                  >신청하기
                </div>
                : <div
                    className='ParticipateLowerDisabled'
                  >신청하기
                </div>}
              {profile.verifiedEmail === true
                ? <div
                    className={!likes ? 'LikesLower BtnType6 Flex' : 'LikesLower BtnType6 Btn6Active Flex'}
                    onMouseDown={(e) => classReplacer('.LikesLower', 'LikesLower BtnType6 Btn6Active')}
                    onMouseUp={(e) => classReplacer('.LikesLower', 'LikesLower BtnType6')}
                    onClick={likeHandler}
                  >
                  <img src={process.env.PUBLIC_URL + '/img/like.svg'} alt='likeImg' className='likeImg' />
                  <div>{card.likesCount}</div>
                </div>
                : <div
                    className={!likes ? 'LikesLowerDisabled BtnType6 Flex' : 'LikesLower BtnType6 Btn6Active Flex'}
                    onClick={likeHandler}
                  >
                  <img src={process.env.PUBLIC_URL + '/img/like.svg'} alt='likeImg' className='likeImg' />
                  <div>{card.likesCount}</div>
                </div>}
            </div>
          </div>
          <div id='ModeratorIntro'>
            <div className='Title4 Moderator'>강연자 소개</div>

            <div id='EditorRenderPosition1' className='EditorHolder'>
              {/* 서버에서 내려준 url 인코딩된 html을 렌더링 */}
              {parse(decodeURIComponent(card.descriptionForMentor[0]))}
            </div>
          </div>
          <div id='TeachDetail'>
            <div className='Title4'>상세정보</div>

            <div id='EditorRenderPosition2' className='EditorHolder' />
          </div>
          <div id='Reviews'>
            <ReviewList id='Reviews' list={card.reviews} />
          </div>
          <div id='FAQ'><Faq /></div>

        </div>

    : !card.title
        ? <div style={{ minWidth: '99vw', minHeight: '99vh' }} className='Flex JustifyCenter AlignCenter'>
          <div>  </div>
        </div>
        : <div className='InfoConatiner Flex-Col AlignCenter'>
          <div className='Flex JustifyAround AlignCenter' style={{ width: '100%', minHeight: '30%' }}>
            <div>
              <div className='Flex InfoTitle Title1'>
                {card.title}
              </div>
              <div className='Flex Caption2-Grey JustifyCenter'>
                {utils.getDate(card.issuedDate)}
              </div>
            </div>
            {profile.verifiedEmail === true
              ? <div
                  className={!likes ? 'LikesLower BtnType6 Flex' : 'LikesLower BtnType6 Btn6Active Flex'}
                  onMouseDown={(e) => classReplacer('.LikesLower', 'LikesLower BtnType6 Btn6Active')}
                  onMouseUp={(e) => classReplacer('.LikesLower', 'LikesLower BtnType6')}
                  onClick={likeHandler}
                >
                좋아요

                </div>
              : <div
                  className={!likes ? 'LikesLowerDisabled BtnType6 Flex' : 'LikesLower BtnType6 Btn6Active Flex'}
                  onClick={likeHandler}
                >
                좋아요
                </div>}
          </div>
          <div className='Flex'>
            {parse(decodeURIComponent(card.detailInfo))}
          </div>
          <div className='Flex JustifyCenter'>
            <a id='create-kakao-link-btn'>
              <img
                src='https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png'
                alt='kakaoShare'
                className='ModalShareBtns'
              />
            </a>
            <div className='create-naver-link-btn'>
              <img
                src={process.env.PUBLIC_URL + '/img/naver_square.png'}
                alt='naverShare'
                onClick={naverShare}
                className='ModalShareBtns'
              />
            </div>
            <div className='create-facebook-link-btn'>
              <img
                src={process.env.PUBLIC_URL + '/img/facebook_logo.png'}
                alt='facebookShare'
                onClick={facebookShare}
                className='ModalShareBtns'
              />
            </div>
            <div className='create-url-link-btn'>
              <img
                src={process.env.PUBLIC_URL + '/img/url.svg'}
                alt='copyUrl'
                onClick={copyUrl}
                className='ModalShareBtns'
              />
            </div>
          </div>
        </div>;
};

export default ViewPost;
