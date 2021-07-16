import React from 'react';
import whoisartLogo from '../../assets/img/illust.png';
const Whoisart = () => {
  return (
    <div className='WhoisartContainer'>
      <div className='WhoisartImgContainer'>
        <img src={whoisartLogo} alt='WhoisartLogo' className='WhoisartImg' />
      </div>
      <div className='WhoisartDesc'>
        <div className='WhoisartTopDesc'>
          <div className='Size32px Height48px'>더이상</div>
          <div className='Size32px Height48px'>사랑하는 예술을 잃지 말고,</div>
          <div className='OTFEB Size32px Height48px'><b>우리 함께 예술해요!</b></div>
        </div>
        <div className='WhoisartMidDesc OTFR'>
          <div>예술단기획단체 후즈아트는 청년 에술인들이 졸업후에도 예술활동을</div>
          <div>이어나가게 하기 위한, 예술계 경험을 쌓는 활동입니다.</div>
        </div>
        <div className='ToWhoisartBtn'>
          <div className='OTFEB Size16px'>View more</div>
        </div>
      </div>
      {/**
       * <Link to='/whoisart/apply' className='whoisartApply' />
      */}
    </div>
  );
};

export default Whoisart;
