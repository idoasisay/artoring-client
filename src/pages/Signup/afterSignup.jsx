import React from 'react';
import axios from 'axios';

import '../../css/signUp/AfterSignup.css';

const AfterSignup = ({ accessToken, loginType }) => {
  const resendVerify = async () => {
    const url = process.env.REACT_APP_NODE_ENV === 'development'
      ? 'https://localhost:4000/verify/retry'
      : 'https://back.artoring.com/verify/retry';

    const response = await axios.post(url, {
      accessToken,
      type: loginType
    });
    window.alert(`메일을 전송했습니다.
회원가입때 사용했던 ${response.data.accepted[0]} 을 확인해주세요`);
  };
  return (
    <div className='Flex-Col AlignCenter RequestContainer'>
      <img src='/img/email.png' alt='이메일' className='RequestEmail' />
      <div className='Title3 RequestTitle'>
        <span style={{ color: '#ff4a70' }}>인증 메일</span>이 발송되었습니다.
      </div>
      <div className='body2 AlignCenter Flex-Col RequestDesc'>
        <div>메일함에서 인증메일을 확인해 주세요.</div>
        <div>이메일 인증이 확인되어야 온전한 서비스를 이용할 수 있습니다.</div>
      </div>
      <div className='ResendVerify body2' onClick={resendVerify}>인증메일 재전송</div>
    </div>
  );
};

export default AfterSignup
;
