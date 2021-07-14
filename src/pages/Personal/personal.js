import React, { useEffect, useState } from 'react';
import Profile from '../../components/Personal/profile';
import Account from '../../components/Personal/account';

import '../../css/Personal/Personal.css';
import axios from 'axios';

const Personal = (props) => {
  const [counter, countHandler] = useState(0);
  const [isProfile, flagToggler] = useState(false);
  const [profile, profileHandler] = useState({});
  useEffect(() => {
    async function awaitFetch () {
      const url = process.env.REACT_APP_NODE_ENV === 'development'
        ? `http://localhost:3000/user/profile?type=${props.type}`
        : `https://temp.artoring.com/user/profile?type=${props.type}`;
      const { data } = await axios.get(url, {
        headers: {
          authorization: `Bearer ${props.token}`
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
        ? `http://localhost:3000/user/profile?type=${props.type}`
        : `https://temp.artoring.com/user/profile?type=${props.type}`;
      axios.put(url, { profile, type: 'email' }, {
        headers: {
          authorization: `Bearer ${props.token}`
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
          <div className={isProfile === false ? 'TogglerActivate' : 'Toggler'} onClick={enableProfile}>
            <div>계정</div>
          </div>
          <div className={isProfile === true ? 'TogglerActivate' : 'Toggler'} onClick={disableProfile}>프로파일</div>
        </div>
        {isProfile
          ? <Account profile={profile} profileHandler={profileHandler} onClickHandler={trigger} />
          : <Profile profile={profile} profileHandler={profileHandler} onClickHandler={trigger} />}
      </div>
    </div>
  );
};

export default Personal;
