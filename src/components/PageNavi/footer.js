import React from 'react';
import '../../css/navigation/Footer.css';

// 푸터의 외형은 완성되었으나 특정 버튼을 누를 경우에대한 핸들러가 아무것도 없음
const Footer = () => {
  return (
    <div className='FooterContainer  Flex JustifyCenter'>
      <img src='/img/logo.png' alt='artoring logo' className='FooterLogo' />
      <div>
        <div className='FooterUpper Flex-Start '>
          <div className='CustomerService'>
            <div className='Title4'>
              CS Center
            </div>
            <div className='WorkingHour body2'>
              <div>MON-FRI 10:00-18:00</div>
              <div>(점심시간 : 13:00-14:00)</div>
              <div>SAT, SUN, Holyday OFF</div>
              <div>010-4780-4474</div>
            </div>

          </div>
          <div className='Contact'>
            <div className='Title4'>
              Contact
            </div>
            <div className='ContactMethods body2'>
              {// 사실 링크를 넣어야만 합니다.
            }
              <div onClick={() => {
                window.Kakao.Channel.chat({
                  channelPublicId: '_jmjqs' // 카카오톡 채널 홈 URL에 명시된 id로 설정합니다.
                });
              }}
              >1:1 채팅 삼당하기
              </div>
              <div>멘토 지원하기</div>
              <div>커리어 개설 요청하기</div>
            </div>
          </div>
          <div className='Social'>
            <div className='Title4'>
              Social
            </div>
            <div className='SocialMethods body2'>
              <div>뉴스레터 구독하기</div>
              <div>유튜브</div>
              <div>인스타그램</div>
            </div>
          </div>
        </div>
        <div className='Flex JustifyCenter FooterLower'>
          <div className='FooterInner Caption3'>
            <div>
              인사이드아트 | 대표 오설윤
            </div>
            <div>
              주소 | 서울시 성북구 삼선교로18나길 5
            </div>
            <div>
              사업자 번호 | 532-02-02173
            </div>
            <div>
              통신판매신고번호 | 제 2021-서울성북-1395 호
            </div>
          </div>
          <div className='FooterInner Caption3'>
            <div>
              개인정보
            </div>
            <div>
              개인정보 처리방침
            </div>
          </div>
          <div className='FooterInner Caption2-Grey'>
            <img src={process.env.PUBLIC_URL + '/img/wardSlogan.png'} alt='서초구' className='WardOffice' />
            <div>서초구 '사회적경제 문화예술 청년 창업지원 프로젝트 '지원을 받아 제작되었습니다.</div>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default Footer;
