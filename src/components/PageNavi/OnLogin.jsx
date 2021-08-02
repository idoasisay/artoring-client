import React from 'react';
import '../../css/navigation/PageNavi.css';

const OnLogin = ({ isLogin, profile }) => {
  return (

    isLogin
      ? <div>로그인/회원가입</div>
      : <div className='OnLoginContainer TextType2 Flex-Col AlignCenter JustifyCenter'>
        <img src={profile.thumb} alt='계정 썸네일' className='OnLoginThumb' />
        <div className='JustifyCenter AlignCenter Flex-Col'>
          <div className='Flex JustifyCenter IsMentor BorderBlack2px'>
            {profile.isMentor ? <div>일반회원</div> : <div>멘토회원</div>}
            <img src={process.env.PUBLIC_URL + '/img/setting.svg'} alt='setting' />
          </div>
          {profile.isMentor ? <div className='MyMentoring Flex AlignCenter JustifyCenter BorderBlack2px-bottom'>나의 멘토링</div> : ''}
          <div className='Flex-Col JustifyCenter AlignCenter CommonalityContainer BorderBlack2px-bottom'>
            <div className='Commonality JustifyAround Flex-Col AlignCenter'>
              <div className=''>좋아요</div>
              <div>구매내역</div>
              <div>로그아웃</div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default OnLogin
;
