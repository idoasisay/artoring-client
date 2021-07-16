import React from 'react';
import '../../css/mainpage/Slogan.css';
import character from '../../assets/img/character.png';

const Slogan = (props) => {
  return (
    <div className='SloganContainer container'>
      <div className='SloganDesc'>
        <div className='SloganTopDesc'>
          <div className='Size36 Height56px'><span className='OTFEB'>청년 예술인</span><span className='OTFRL'>들의</span></div>
          <div className='Size36 Height56px OTFEB'>커리어 문제해결,</div>
          <div className='Size36 Height56px OTFRL'>아토링과 함께 해주세요!</div>
        </div>
      </div>
      <div className='SloganImgContainer'>
        <img src={character} alt='SloganLogo' className='SloganImg' />
      </div>
    </div>
  );
};

export default Slogan;
