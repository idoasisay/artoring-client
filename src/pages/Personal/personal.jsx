import React, { useEffect, useState } from 'react';
import Profile from '../../components/Personal/profile';
import Account from '../../components/Personal/account';

import '../../css/Personal/Personal.css';
import axios from 'axios';

const Personal = ({ profile, profileHandler, loginType, token }) => {
  const [counter, countHandler] = useState(0);
  const [isProfile, flagToggler] = useState(false);
  useEffect(() => {
    async function awaitFetch () {
      const url = process.env.REACT_APP_NODE_ENV === 'development'
        ? `https://localhost:4000/profile?type=${loginType}&id=${profile._id}`
        : `https://temp.artoring.com/profile?type=${loginType}&id=${profile._id}`;
      const { data } = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      profileHandler(data);
    }
    awaitFetch();
  }, []);

  const enableProfile = () => {
    flagToggler(true);
  };
  const disableProfile = () => {
    flagToggler(false);
  };
  const trigger = () => {
    countHandler(counter + 1);
  };
  const uploader = () => {
    if (counter !== 0) {
      const url = process.env.REACT_APP_NODE_ENV === 'development'
        ? `https://localhost:4000/profile?type=${loginType}`
        : `https://temp.artoring.com/profile?type=${loginType}`;
      axios.put(url, { profile, type: loginType }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    }
  };

  useEffect(uploader, [counter]);

  return (
    <div className='PersonalContainer'>
      <div className='PersonalTitle'>일반회원</div>
      <div>
        <div className='TogglerContainer Flex'>
          <div
            className={isProfile === false ? 'Account Toggler BtnType3' : 'Account Toggler BtnType3 Btn3Active'} onClick={enableProfile}
          >
            <div>계정</div>
          </div>
          <div
            className={isProfile === true ? 'Profile Toggler BtnType3' : 'Profile Toggler BtnType3 Btn3Active'} onClick={disableProfile}
          >프로파일
          </div>
        </div>
        {isProfile
          ? <Account profile={profile} profileHandler={profileHandler} onClickHandler={trigger} />
          : <Profile profile={profile} profileHandler={profileHandler} onClickHandler={trigger} />}
      </div>
    </div>
  );
};

export default Personal;
