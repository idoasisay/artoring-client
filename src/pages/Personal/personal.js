import React, { useState } from 'react';
import Profile from '../../components/Personal/profile';
import Account from '../../components/Personal/account';

import '../../css/Personal/Personal.css';

const Personal = (props) => {
  const [isProfile, flagToggler] = useState(false);
  const [profile, profileHandler] = useState({ name: 'test' });
  const enableProfile = () => {
    flagToggler(true);
  };
  const disableProfile = () => {
    flagToggler(false);
  };
  return (
    <div className='PersonalContainer'>
      <div className='PersonalTitle'>일반회원</div>
      <div>
        <div className='TogglerContainer Flex'>
          <div className={isProfile === false ? 'TogglerActivate' : 'Toggler'} onClick={enableProfile}>
            <div>계정</div>
          </div>
          <div className={isProfile === true ? 'TogglerActivate' : 'Toggler'} onClick={disableProfile}>프로파일</div>
        </div>
        {isProfile
          ? <Account profile={profile} profileHandler={profileHandler} />
          : <Profile profile={profile} profileHandler={profileHandler} />}
      </div>
    </div>
  );
};

export default Personal;
