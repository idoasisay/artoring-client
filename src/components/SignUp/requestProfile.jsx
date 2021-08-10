import { useHistory } from 'react-router-dom';

import '../../css/signUp/AfterSignup.css';

const ProfileRequest = () => {
  const history = useHistory();

  const kickToAccount = () => {
    history.push('/detail/account');
  };

  return (
    <div className='Flex-Col JustifyCenter AlignCenter'>
      <img src='/img/shinyLogo.png' alt='환영 로고' className='WelcomeImg' />
      <img src='/img/welcome.png' alt='환영' className='WelcomeLogo' />
      <div className='Title3 SignupFinish'>회원가입이 완료되었습니다.</div>
      <div className='Flex-Col AlignCenter body2 WelcomeDesc'>
        <div className=''>마이페이지에서 추가로 프로필을 작성해 주시면</div>
        <div>더욱 편리하게 아토링을 이용하실 수 있어요!</div>
      </div>
      <div
        className='BtnType4 WelcomeBtn Flex JustifyCenter AlignCenter'
        onClick={kickToAccount}
      >프로필 작성하러 가기
      </div>
    </div>
  );
};

export default ProfileRequest;
