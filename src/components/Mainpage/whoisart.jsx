import React from 'react';

const Whoisart = () => {
  return (
    <div className='WhoisartContainer'>
      <div className='WhoisartImgContainer'>
        <img src='img/whoisart-main.png' alt='WhoisartLogo' className='WhoisartImg' />
      </div>
      <div className='WhoisartDesc'>
        <div className='WhoisartTopDesc'>
          <div className='Title2 OTFR'>더이상</div>
          <div className='Title2 OTFR'>사랑하는 예술을 잃지 말고,</div>
          <div className='Title2 OTFEB'><b>우리 함께 예술해요!</b></div>
        </div>
        <div className='WhoisartMidDesc body1 OTFB'>
          <div>예술단기획단체 후즈아트는 청년 에술인들이 졸업후에도 예술활동을</div>
          <div>이어나가게 하기 위한, 예술계 경험을 쌓는 활동입니다.</div>
        </div>
        <div className='ToWhoisartBtn BtnType2'>
          {/**
           * 후즈아트 지원 페이지로 연결되어야 하지만, 페이지가 없음
           */}
          <div>View more</div>
        </div>
      </div>
    </div>
  );
};

export default Whoisart;
