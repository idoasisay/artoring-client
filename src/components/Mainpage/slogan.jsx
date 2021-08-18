import React from 'react';
import '../../css/mainpage/Slogan.css';

const Slogan = (props) => {
  return (
    <div className='SloganContainer container'>
      <div className='SloganDesc Flex-Col Flex-Start'>
        <div className='SloganTopDesc '>
          <div className='Title1'><span style={{ color: '#ff4a70' }}>청년 예술인</span><span className='OTFRL'>들의</span></div>
          <div className='Title1 OTFEB'>커리어 문제해결,</div>
          <div className='Title1 OTFRL'>아토링과 함께 해주세요!</div>
        </div>
        <div className=''>
          <div className='BtnType2 SloganBtn body1'>View more</div>
        </div>
      </div>
      <div className='SloganImgContainer'>
        <img src='img/character.png' alt='SloganLogo' className='SloganImg' />
      </div>
    </div>
  );
};

export default Slogan;
