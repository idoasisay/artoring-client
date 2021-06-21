import React from 'react';
import { Link } from 'react-router-dom';
import Card from './card';
import '../../css/CardList.css';

const CardList = ({ data }) => {
  console.log(data);
  return (
    <div className='CardList'>
      <div className='CardListTitle'>{data.title}</div>
      <div className='CardsContainer'>
        {data.cards.map((ele, i) => <Card data={ele} key={i} />)}
      </div>
      <div className='MoreInfo' />
    </div>
  );
};

export default CardList;
