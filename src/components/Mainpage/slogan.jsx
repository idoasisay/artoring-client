import React from 'react';
import '../../css/mainpage/Slogan.css';

const Slogan = (props) => {
  return (
    <div className='SloganContainer'>
      <div className='SloganDesc'>
        <div className='SloganTopDesc'>
          <div><b>청년 예술인</b>들의</div>
          <div><b>커리어 문제해결,</b></div>
          <div>아토링과 함께 해주세요!</div>
        </div>
      </div>
      <div className='SloganImg'>
        <img src='' alt='SloganLogo' />
      </div>
    </div>
  );
};

export default Slogan;
