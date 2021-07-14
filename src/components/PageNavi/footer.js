import React from 'react';
import '../../css/navigation/Footer.css';

const Footer = () => {
  return (
    <div className='FooterContainer'>
      <div className='FooterUpper'>
        <div className='CompanyTitle'>
          ARTORING
        </div>
        <div className='CustomerService'>
          <div className='CSCenter'>
            CS Center
          </div>
          <div className='WorkingHour'>
            <div>MON-FRI 10:00-18:00</div>
            <div>(점심시간 : 13:00-14:00)</div>
            <div>SAT, SUN, Holyday OFF</div>
            <div>00-0000-3333</div>
          </div>
          <div className='FooterLower'>
            <div>
              인사이드아트 | 대표 오설윤
            </div>
            <div>
              주소지 / 사업자 번호 / 통신판매신호번호
            </div>
            <div>
              이용약관 / 개인정보처리방침
            </div>
          </div>
        </div>
        <div className='Contact'>
          <div className='ContactTile'>
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
          <div className='SocialTitle'>
            Social
          </div>
          <div className='SocialMethods'>
            <div>뉴스레터 구독하기</div>
            <div>유튜브</div>
            <div>인스타그램</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
