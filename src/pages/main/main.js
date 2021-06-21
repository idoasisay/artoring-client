import React from 'react';
import CardList from '../../components/Mainpage/cardList';
import Slgoan from '../../components/Mainpage/slogan';
import Whoisart from '../../components/Mainpage/whoisart';
import '../../css/Main.css';

const mainPage = (props) => {
  return (
    <div className='MainContainer'>
      <div className='Slogan'>
        <Slgoan />
      </div>
      <div className='MentorFindContainer'>
        <CardList data={props.mentor} />
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
