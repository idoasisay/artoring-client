import { useEffect } from 'react';

const Kakao1by1Btn = () => {
  // useEffect(() => {
  //   (window).Kakao.Channel.createAddChannelButton({
  //     container: '#kakao-add-channel-button',
  //     channelPublicId: '_jmjqs' // 카카오톡 채널 홈 URL에 명시된 id로 설정합니다.
  //   });
  // }, []);

  const clickHandler = () => {
    window.Kakao.Channel.chat({
      channelPublicId: '_jmjqs' // 카카오톡 채널 홈 URL에 명시된 id로 설정합니다.
    });
  };
  return (
    <img
      onClick={clickHandler} id='kakao-add-channel-button' alt='1대1 버튼' src={process.env.PUBLIC_URL + '/img/favicon.png'}

    />
  );
}
;

export default Kakao1by1Btn;
