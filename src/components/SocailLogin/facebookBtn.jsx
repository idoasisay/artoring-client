import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../../css/Facebook.css';

const url = process.env.REACT_APP_NODE_ENV === 'development'
  ? 'https://localhost:4000/login'
  : 'https://back.artoring.com/login';

/* eslint-disable */
const FbLogin = ({ typeHandler, loginHandler, tokenHandler, profileHandler }) => {

  function onLoginHandler () {
    const time = setInterval(async () => {
      const sessionKey = sessionStorage.key(0);
      const { authResponse } = sessionKey? JSON.parse(sessionStorage.getItem(sessionKey)) : null;

      if (authResponse) {
        sessionStorage.removeItem(sessionKey);
        typeHandler('facebook');
        loginHandler(true);
        tokenHandler(authResponse.accessToken);
        const { userData } = await axios.get(url.concat('/facebook'));

        profileHandler(userData);

        history.push('/');
        clearInterval(time);
      } else {
         history.push('/');
         clearInterval(time);
      }
    }, 100);
  }
  global.onLoginHandler = onLoginHandler;

  const history = useHistory();
  useEffect(() => {
    setFBAsyncInit();

    const t = document.querySelector('.fb-login-button');

    t.setAttribute('onlogin', 'onLoginHandler();');
  }, []);

  function setFBAsyncInit () {
      window.FB.init({
        version: 'v11.0', // 작성일 기준 버전이 v6.0 입니다.
        appId: `${process.env.REACT_APP_FACEBOOK_APP_ID}`, // 발급받은 App ID 를 넣어줍니다.
        xfbml: true,
        cookie: true
      });

  }


  return (
   <div
      className='fb-login-button'
      data-width='300px'
      data-size='large'
      data-button-type='login_with'
      data-layout='default'
      data-auto-logout-link='false'
      data-use-continue-as='false'
    />
  );
};

export default FbLogin
;
