import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardList from '../../components/Common/cardList.jsx';
import Slgoan from '../../components/Mainpage/slogan.jsx';
import Whoisart from '../../components/Mainpage/whoisart.jsx';
import '../../css/mainpage/Main.css';

const url = process.env.REACT_APP_NODE_ENV === 'development'
  ? 'https://localhost:4000/verify/retry'
  : 'https://back.artoring.com/verify/retry';

const MainPage = ({ isLogin, profile, accessToken, loginType, searchDataHandler, setDropdown }) => {
  const [cards, cardsHandler] = useState([]);

  function getCards () {
    async function inner () {
      const uri = process.env.REACT_APP_NODE_ENV === 'development'
        ? 'https://localhost:4000'
        : 'https://back.artoring.com';
      const { data } = await axios.get(uri.concat('/career/teach?size=8&isGroup=true'));

      cardsHandler(data.cardList);
    }
    inner();
  }

  useEffect(() => {
    const asyncAlert = async function () {
      if (isLogin && profile && profile.verifiedEmail === false) {
        const t = new Date().getTime() - new Date(profile.createdAt).getTime();

        if (t >= 600000) {
          window.alert('이메일 검증이 완료되어야 모든 기능을 사용할 수 있습니다.');
          if (window.confirm('다시한번 인증 메일을 보낼까요?')) {
            const response = await axios.post(url, {
              accessToken,
              type: loginType
            });
            window.alert(`메일을 전송했습니다.
회원가입때 사용했던 ${response.data.accepted[0]} 을 확인해주세요`);
          }
        }
      }
    };
    asyncAlert();
  }, []);

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div className='MainContainer'>
      <div className='Slogan'>
        <Slgoan />
      </div>
      <div className='CareerFindContainer'>
        <CardList
          title='커리어 교육'
          cards={cards}
          likedCareerEdu={profile ? profile.likedCareerEdu : []}
          renderType='teach'
          loginType={loginType}
          accessToken={accessToken}
          isLogin={isLogin}
          searchDataHandler={searchDataHandler}
          setDropdown={setDropdown}
        />
      </div>
      <div className='WhoisartContainer'>
        <Whoisart />
      </div>
    </div>
  );
}
;
export default MainPage;
