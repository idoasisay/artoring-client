import React from 'react';
import TagList from './tagList';
import '../../css/Card.css';

const Card = ({ data }) => {
  console.log(data);
  return (
    <div className='Card'>
      <div>
        <img className='CardThumb' src={data.thumb} />
      </div>
      <div className='CardCategory'>
        <TagList tags={data.tag} />
      </div>
      <div className='CardTitle'>{data.title}</div>
      <div className='CardDate'>{data.date}</div>
      <div className='CardPrice'>{data.price}</div>
    </div>
  );
}
;

export default Card;
