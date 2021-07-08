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
        ? 'http://localhost:3000'
        : 'http://temp.artoring.com';
      const { data } = await axios.get(uri.concat('/career/teach'));
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
        <CardList data={{ title: '커리어 교육', cards: cards }} />
      </div>
      <div className='WhoisartContainer'>
        <Whoisart />
      </div>
    </div>
  );
}
;
export default MainPage;
