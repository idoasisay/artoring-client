import React from 'react';
import CardList from '../../components/Mainpage/cardList.jsx';
import Slgoan from '../../components/Mainpage/slogan.jsx';
import Whoisart from '../../components/Mainpage/whoisart.jsx';
import '../../css/mainpage/Main.css';

const mainPage = (props) => {
  return (
    <div className='MainContainer'>
      <div className='Slogan'>
        <Slgoan />
      </div>
      <div className='CareerFindContainer'>
        <CardList data={props.career} />
      </div>
      <div className='WhoisartContainer'>
        <Whoisart />
      </div>
    </div>
  );
}
;
export default mainPage;
