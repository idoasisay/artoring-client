import React from 'react';
import { useHistory } from 'react-router';
import '../../css/navigation/PageNavi.css';

// 로그인 이후 로그인/회원가입 대신 렌더링되는 섬네일, 드랍다운 메뉴
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
  function kickToLikes () {
    history.push('/user/likes');
  }
  return (

    <div className='OnLoginContainer TextType2 AlignCenter '>
      <div className='Flex JustifyCenter'>
        <img src={profile.thumb} alt='계정 썸네일' className='OnLoginThumb' />
      </div>
      <div className='Dropdown JustifyCenter AlignCenter Flex-Col'>
        <div className='Flex JustifyCenter AlignCenter IsMentor BorderBlack2px TextType3 Title5'>
          {!profile.isMentor ? <div onClick={kickToMentiProfile}>일반회원</div> : <div>멘토회원</div>}
          <img src={process.env.PUBLIC_URL + '/img/setting.svg'} alt='setting' />
        </div>
        {profile.isMentor ? <div className='MyMentoring Flex AlignCenter JustifyCenter BorderBlack2px-bottom TextType3 Title5'>나의 멘토링</div> : ''}
        <div className='Flex-Col JustifyCenter AlignCenter CommonalityContainer BorderBlack2px-bottom'>
          <div className='Commonality JustifyAround Flex-Col AlignCenter'>
            <div className='TextType3 Title5' onClick={kickToLikes}>좋아요</div>
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
