import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const url = process.env.REACT_APP_NODE_ENV === 'development'
  ? 'https://localhost:4000/logout'
  : 'https://back.artoring.com/logout';

const Logout = ({ loginType, accessToken, tokenHandler, profileHandler, loginHandler }) => {
  const history = useHistory();

  useEffect(() => {
    async function asyncLogout () {
      const token = await axios.get(url.concat(`?type=${loginType}`), {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });
      // 유효기간 0 짜리 토큰이 있는경우 토큰으로 설정
      token.data ? tokenHandler(token.data.token) : tokenHandler('');
    }

    asyncLogout();

    profileHandler({});
    loginHandler(false);
    history.push('/');
  });

  return <div style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 11 }} />;
};

export default Logout;
