import React from 'react';

const Whoisart = () => {
  return (
    <div className='WhoisartContainer'>
      <div className='WhoisartImg'>
        <img src='' alt='WhoisartLogo' />
      </div>
      <div className='WhoisartDesc'>
        <div className='WhoisartTopDesc'>
          <div>더이상</div>
          <div>사랑하는 예술을 잃지 말고,</div>
          <div><b>우리 함께 예술해요!</b></div>
        </div>
        <div className='WhoisartMidDesc'>
          <div>예술단기획단체 후즈아트는 청년 에술인들이 졸업후에도 예술활동을</div>
          <div>이어나가게 하기 위한, 예술계 경험을 쌓는 활동입니다.</div>
        </div>
        <div className='ToWhoisartBtn'>
          <div>View more</div>
        </div>
      </div>
      {/**
       * <Link to='/whoisart/apply' className='whoisartApply' />
      */}
    </div>
  );
};

export default Whoisart;
