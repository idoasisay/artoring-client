import React from 'react';
import '../../css/navigation/Footer.css';

// 푸터의 외형은 완성되었으나 특정 버튼을 누를 경우에대한 핸들러가 아무것도 없음
const Footer = () => {
  return (
    <div className='FooterContainer'>
      <img src='img/logo.png' alt='artoring logo' className='FooterLogo' />
      <div>
        <div className='FooterUpper'>
          <div className='CustomerService'>
            <div className='SubTitle'>
              CS Center
            </div>
            <div className='WorkingHour'>
              <div>MON-FRI 10:00-18:00</div>
              <div>(점심시간 : 13:00-14:00)</div>
              <div>SAT, SUN, Holyday OFF</div>
              <div>00-0000-3333</div>
            </div>

          </div>
          <div className='Contact'>
            <div className='SubTitle'>
              Contact
            </div>
            <div className='ContactMethods'>
              {// 사실 링크를 넣어야만 합니다.
            }
              <div>1:1 채팅 삼당하기</div>
              <div>멘토 지원하기</div>
              <div>커리어 개설 요청하기</div>
            </div>
          </div>
          <div className='Social'>
            <div className='SubTitle'>
              Social
            </div>
            <div className='SocialMethods'>
              <div>뉴스레터 구독하기</div>
              <div>유튜브</div>
              <div>인스타그램</div>
            </div>
          </div>
        </div>
        <div className='FooterLower'>
          <div className='FooterInner'>
            <div>
              인사이드아트 | 대표 오설윤
            </div>
            <div>
              주소 | 서울시 종로구 을지로입구 위워크 14F
            </div>
            <div>
              사업자 번호 | 234-323-212343
            </div>
            <div>
              통신판매신고번호 | 제 3432-서울성동-23432호
            </div>
          </div>
          <div className='FooterInner'>
            <div>
              개인정보
            </div>
            <div>
              개인정보 처리방침
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
