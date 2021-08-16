import React from 'react';
import { useHistory } from 'react-router';
import '../../css/navigation/PageNavi.css';

const OnLogin = ({ profile }) => {
  const history = useHistory();

  function kickToPurchasedHistory () {
    history.push('/user/reserve');
  }
  function kickToLogout () {
    history.push('/logout');
  }
  function kickToMentiProfile () {
    history.push('/user/edit');
  }
  return (

    <div className='OnLoginContainer TextType2 AlignCenter '>
      <div className='Flex JustifyCenter'>
        <img src={profile.thumb} alt='계정 썸네일' className='OnLoginThumb' />
      </div>
      <div className='Dropdown JustifyCenter AlignCenter Flex-Col'>
        <div className='Flex JustifyCenter IsMentor BorderBlack2px TextType3 Title5'>
          {!profile.isMentor ? <div onClick={kickToMentiProfile}>일반회원</div> : <div>멘토회원</div>}
          <img src={process.env.PUBLIC_URL + '/img/setting.svg'} alt='setting' />
        </div>
        {profile.isMentor ? <div className='MyMentoring Flex AlignCenter JustifyCenter BorderBlack2px-bottom TextType3 Title5'>나의 멘토링</div> : ''}
        <div className='Flex-Col JustifyCenter AlignCenter CommonalityContainer BorderBlack2px-bottom'>
          <div className='Commonality JustifyAround Flex-Col AlignCenter'>
            <div className='TextType3 Title5'>좋아요</div>
            <div className='TextType3 Title5' onClick={kickToPurchasedHistory}>구매내역</div>
            <div className='TextType3 Title5' onClick={kickToLogout}>로그아웃</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnLogin
;
