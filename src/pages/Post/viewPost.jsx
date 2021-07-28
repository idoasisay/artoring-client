import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';

import utils from '../../components/Common/index';

import axios from 'axios';
import TagList from '../../components/Common/tagList';
import Faq from '../../components/CareerTeach/FAQ';
import ReviewList from '../../components/CareerTeach/ReviesList';

import '../../css/cardDetail/cardDetail.css';
import likeImg from '../../assets/img/like.svg';

const { classReplacer } = utils;

const ViewPost = ({ profile, profileHandler, isLogin, loginType, accessToken }) => {
  const { id } = useParams();
  const [card, cardHandler] = useState({});

  // 로그인이 안되어 있으면 profile에 likedCareerEdu가 없다
  // 로그인이 되어있다면 상세 정보 렌더링 대상의 카드의 id를 바탕으로 유저가 좋아요를 누른 리스트에
  // 포함되어 있는지를 확인한다.
  // String은 inludes 넘버타입으로 형변환이 이뤄지지 않는다.
  const [likes, likesHandler] = useState(profile.likedCareerEdu
    ? profile.likedCareerEdu.includes(Number(id))
    : false);

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
        ? await axios.delete(uri.concat(`/likes/teach/${id}?type=${loginType}`), {
            headers: {
              authorization: `Bearer ${accessToken}`
            }
          })
        : await axios.post(uri.concat('/likes/teach'), {
          type: loginType,
          targetId: id
        }, {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        });

      let likedCareerEdu = profile.likedCareerEdu;

      if (likes) {
        // 좋아요를 눌렀다면 유저의 좋아요 목록에서 splice로 해당 항목 삭제
        const pos = profile.likedCareerEdu.indexOf(id);
        profile.likedCareerEdu.splice(pos, 1);

        likedCareerEdu = profile.likedCareerEdu;
        cardHandler({ ...card, likesCount: card.likesCount - 1 });
      } else {
        // 좋아요가 안되어 있다면 유저의 좋아요 목록에 등록
        likedCareerEdu = likedCareerEdu.push(Number(id));
        cardHandler({ ...card, likesCount: card.likesCount + 1 });
      }

      profileHandler({ ...profile, likedCareerEdu });
      likesHandler(!likes);
    }
  };
  useEffect(() => {
    async function getCardInfo () {
      const url = process.env.REACT_APP_NODE_ENV === 'development'
        ? `https://localhost:4000/career/teach/${id}`
        : `https://back.artoring.com/career/teach/${id}`;
      const { data } = await axios.get(url);
      console.log(data[0]);
      cardHandler(data[0]);
    }

    getCardInfo();
  }, []);
  return (
    !card.title
      ? <div> waiting...</div>
      : <div className='CareerTeachContainer'>
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

              <div
                className='ParticipateUpper BtnType5'
                onMouseDown={(e) => classReplacer('.ParticipateUpper', 'ParticipateUpper BtnType5 Btn5Active')}
                onMouseUp={(e) => classReplacer('.ParticipateUpper', 'ParticipateUpper BtnType5')}
              >신청하기
              </div>

              <div
                className={!likes ? 'LikesUpper BtnType6 Flex' : 'LikesUpper BtnType6 Btn6Active Flex'}
                onClick={likeHandler}
              >
                <img src={likeImg} alt='likeImg' className='likeImg' />
                <div id='test'>{card.likesCount}</div>

              </div>

            </div>
          </div>
        </div>
        <div className='CareerTeachMiddelUI Flex'>
          <div className='MiddleUiInner Flex'>
            <a href='#ModeratorIntro' className='MiddleUiBtn Title5'>강연자 소개</a>
            <a href='#TeachDetail' className='MiddleUiBtn Title5'>상세정보</a>
            <a href='#Reviews' className='MiddleUiBtn Title5'>프로그램 후기</a>
            <a href='#FAQ' className='MiddleUiBtn Title5'>FAQ</a>
          </div>
          <div className='Flex'>
            <div
              className='ParticipateLower BtnType5'
              onMouseDown={(e) => classReplacer('.ParticipateLower', 'ParticipateLower BtnType5 Btn5Active')}
              onMouseUp={(e) => classReplacer('.ParticipateLower', 'ParticipateLower BtnType5')}
            >신청하기
            </div>
            <div
              className={!likes ? 'LikesLower BtnType6 Flex' : 'LikesLower BtnType6 Btn6Active Flex'}
              onMouseDown={(e) => classReplacer('.LikesLower', 'LikesLower BtnType6 Btn6Active')}
              onMouseUp={(e) => classReplacer('.LikesLower', 'LikesLower BtnType6')}
              onClick={likeHandler}
            >
              <img src={likeImg} alt='likeImg' className='likeImg' />
              <div>{card.likesCount}</div>
            </div>
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

  );
};

export default ViewPost;
