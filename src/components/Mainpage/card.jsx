import React from 'react';
import TagList from './tagList.jsx';
import '../../css/mainpage/Card.css';

const Card = ({ data }) => {
  function getDate (date) {
    const word = ['월', '화', '수', '목', '금', '토', '일'];
    const now = new Date(date);

    const year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDay();
    const index = now.getDay();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    return `${year}.${month}.${day}(${word[index]})`;
  }
  return (
    <div className='Card'>
      <div>
        <img className='CardThumb' src={data.thumb} />
      </div>
      <div className='CardCategory'>
        <TagList tags={data.tag} />
      </div>
      <div className='CardTitle'>{data.title}</div>
      <div className='CardDate'>{getDate(data.startDate) + ' - ' + getDate(data.endDate)}</div>
      <div className='CardPrice'>{data.price}</div>
    </div>
  );
}
;

export default Card;
