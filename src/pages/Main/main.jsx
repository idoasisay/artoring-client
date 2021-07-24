import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardList from '../../components/Mainpage/cardList.jsx';
import Slgoan from '../../components/Mainpage/slogan.jsx';
import Whoisart from '../../components/Mainpage/whoisart.jsx';
import '../../css/mainpage/Main.css';

const MainPage = (props) => {
  const [cards, cardsHandler] = useState([]);

  function getCards () {
    async function inner () {
      const uri = process.env.REACT_APP_NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : 'http://back.artoring.com';
      const { data } = await axios.get(uri.concat('/career/teach'));
      console.log(props.profile, data);
      cardsHandler(data);
    }
    inner();
  }

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
          data={{ title: '커리어 교육', cards: cards, likedCareerEdu: props.profile ? props.profile.likedCareerEdu : [] }}
          loginType={props.profile.loginType}
          accessToken={props.accessToken}
          isLogin={props.isLogin}
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
