import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const VerifyRequest = () => {
  const history = useHistory();
  const [isSucceed, toggler] = useState(0);
  const [timer, timeHandler] = useState(5);

  useEffect(() => {
    const requrestVerify = async () => {
      try {
        const url = process.env.REACT_APP_NODE_ENV === 'development'
          ? 'https://localhost:4000/verify/email'
          : 'https://back.artoring.com/verify/email';

        await axios.post(url, {
          token: history.location.search.split('=')[1]
        });
        toggler(1);
      } catch (e) {
        console.log(e);
        toggler(2);
      }
    };
    requrestVerify();
  }, []);

  useEffect(() => {
    if (isSucceed === 1) {
      const ticker = setInterval(() => {
        console.log(timer);
        if (timer < 1) {
          clearInterval(ticker);
          window.close();
        } else {
          timeHandler(parseInt(timer) - 1);
        }
      }, 1000);
    }
  }, [isSucceed, timer]);

  return (
    isSucceed === 1
      ? <div>
        <div className='body2'>계정 활성화가 완료되었습니다!</div>
        <div>{timer} 초 뒤에 해당 창은 자동으로 종료됩니다.</div>
      </div>
      : isSucceed === 0
        ? <div>서버 응답을 기다리는중</div>
        : <div>잘못된 접근입니다.</div>

  );
};

export default VerifyRequest
;
