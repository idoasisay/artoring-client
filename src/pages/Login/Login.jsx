import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import utils from '../../components/Common';

import FbLogin from '../../components/SocailLogin/facebookBtn';

import '../../css/login/Login.css';

const { classReplacer } = utils;

const url = process.env.REACT_APP_NODE_ENV === 'development'
  ? 'https://localhost:4000/login'
  : 'https://back.artoring.com/login';

const Login = ({ profileHandler, loginHandler, tokenHandler, typeHandler }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();

  function KandNloginProcessor () {
    const time = setInterval(async () => {
      const sessionKey = 'authResponse';
      if (sessionStorage.getItem(sessionKey)) {
        const { code, type, state } = JSON.parse(sessionStorage.getItem(sessionKey));
        if (code) {
          sessionStorage.removeItem(sessionKey);
          console.log(code, type, state);
          const { data } = await axios.post(url.concat(`/${type}`), { code, state });
          const { accessToken, trimedData, signup } = data;
          typeHandler(type);
          loginHandler(true);
          tokenHandler(accessToken);
          profileHandler(trimedData);

          if (signup === true) { history.push('/signup/detail/account'); } else { history.push('/'); }
          clearInterval(time);
        } else {
          history.push('/');
          clearInterval(time);
        }
      }
    }, 1000);
  }

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const { userData, token } = await axios.post(url, { email, password });
      profileHandler(userData);
      loginHandler(true);
      tokenHandler(token);
      typeHandler('email');

      history.push('/');
    } catch (e) {
      alert('이메일 혹은 비밀번호가 잘못되었습니다.');
    }
  };
  return (
    <div className='LoginContainer Flex JustifyCenter'>
      <div className='LimitWidth'>
        <div className='Title3 AlignLeft LoginHead'>로그인</div>
        <div className='SocailBtnContainer'>

          <FbLogin loginHandler={loginHandler} typeHandler={typeHandler} tokenHandler={tokenHandler} profileHandler={profileHandler} />
          <div className='FacebookLogin' />
          <div className=''>
            <div
              className='NaverLogin Flex'
              onClick={() => {
                const state = encodeURI('58randomstate/a');
                const redirect_uri = process.env.REACT_APP_NODE_ENV === 'development' ? 'https://localhost:3000/callback/naver' : 'https://insideart-dev.artoring.com/callback/naver';
                window.open(`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_APP_ID}&redirect_uri=${redirect_uri}&state=${state}`,
                  'popoup',
              `toolbar=no, location=no, status=no,
              menubar=no, scrollbars=no, resizable=no,
              width=400, height=500`
                );
                KandNloginProcessor();
              }}
            >
              <div alt='NaverLogo' className='NaverLogo'>N</div>
              <div className='NaverDesc'>네이버 아이디로 로그인</div>
            </div>
          </div>
          <div
            className='KakaoLogin' onClick={() => {
              const state = encodeURI('58randomstate/a');
              console.log(state);
              const redirect_uri = process.env.REACT_APP_NODE_ENV === 'development' ? 'https://localhost:3000/callback/kakao' : 'https://insideart-dev.artoring.com/callback/kakao';
              window.open(`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_ID}&redirect_uri=${redirect_uri}&response_type=code&state=${state}`,
                'popoup',
              `toolbar=no, location=no, status=no,
              menubar=no, scrollbars=no, resizable=no,
              width=400, height=500`
              );
              KandNloginProcessor();
            }}
          >
            <img className='KakaoLogo' alt='kakoLogo' src={process.env.PUBLIC_URL + '/img/kakao_ci.png'} />
            <div className='KakaoDesc'>카카오톡으로 로그인</div>
          </div>
        </div>
        <div className='Delimiter LimitWidth Flex'>
          <div className='DelimiterInner' />
          <div className='Or'>or</div>
          <div className='DelimiterInner' />
        </div>
        <div className='EmailContainer Flex '>
          <form onSubmit={handleSubmit(onSubmit)} className='LimitWidth'>
            <label>
              <div className='Email'>
                <div className='Ttile5, FormTitle'>이메일</div>
                <textarea className='PlaceHolder LimitWidth' type='text' {...register('email')} />
              </div>
            </label>
            <label>
              <div className='Password'>
                <div className='Ttitle5 FormTitle'>비밀번호</div>
                <textarea className='PlaceHolder LimitWidth' type='text' {...register('password')} />
              </div>
            </label>
            <label>
              <div className='PlaceHolderBtnContainer'>
                <div
                  className='PlaceHolderBtn BtnType5'
                  onMouseOver={(e) => classReplacer('.PlaceHolderBtn', 'PlaceHolderBtn BtnType5 Btn5Active')}
                  onMouseLeave={(e) => classReplacer('.PlaceHolderBtn', 'PlaceHolderBtn BtnType5')}
                >변경사항 저장
                </div>
              </div>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
