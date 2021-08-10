
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

const VerifyRequest = ({ tokenHandler, loginHandler, typeHandler, profileHandler }) => {
  const [isSucceed, toggler] = useState(0);

  const history = useHistory();
  useEffect(() => {
    const requrestVerify = async () => {
      try {
        const url = process.env.REACT_APP_NODE_ENV === 'development'
          ? 'https://localhost:4000/verify/email'
          : 'https://back.artoring.com/verify/email';

        const { data: response } = await axios.post(url, {
          token: history.location.search.split('=')[1]
        });
        const { accessToken, profile } = response;

        tokenHandler(accessToken);
        loginHandler(true);
        typeHandler('email');
        profileHandler(profile);

        history.push('/request');
      } catch (e) {
        console.log(e);
        toggler(2);
      }
    };
    requrestVerify();
  }, []);

  return (
    isSucceed === 1
      ? <div />
      : isSucceed === 0
        ? <div style={{ width: '99vw', height: '99vh', zIndex: 20, position: 'fixed', backgroundColor: '#ffffff' }} className='Flex-Col  JustifyCenter AlignCenter'>서버 응답을 기다리는중</div>
        : <div style={{ width: '99vw', height: '99vh', zIndex: 20, position: 'fixed', backgroundColor: '#ffffff' }} className='Flex-Col  JustifyCenter AlignCenter'>잘못된 접근입니다.</div>

  );
};

export default VerifyRequest
;
