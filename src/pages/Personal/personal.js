import React, { useState } from 'react';
import Profile from '../../components/personal/profile';
import '../../css/personal/personal.css';

const Personal = (props) => {
  const [profile, profileHandler] = useState({ name: 'test' });
  return (<div className='PersonalContainer'><Profile profile={profile} profileHandler={profileHandler} /> </div>);
};

export default Personal;
