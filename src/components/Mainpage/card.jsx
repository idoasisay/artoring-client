import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TagList from './tagList.jsx';

import utils from '../Common/index.js';

import '../../css/mainpage/Card.css';
import likeIcon from '../../assets/img/like.svg';

// 메인페이지에서 사용되는 카드를 렌더링하는 컴포넌트
const Card = ({ data, liked }) => {
  const history = useHistory();

  // 개인이 좋아요한걸 표현하기 위해 사용되는 상태.
  // 핸들러는 클릭하면 해당 카드의 상세페이지로 전환되어야 하기 때문에
  // 사용되지 않음
  const [likes, likesHandler] = useState(liked);

  return (
    <div
      className='Card' onClick={() => {
        history.push(`/career/teach/${data.id}`);
      }}
    >
      <img
        src={likeIcon} alt='likeImg' className={likes ? 'CardLikes LikeActive' : 'CardLikes'}
      />
      <div>
        <img className='CardThumb' alt='cardThumbnail' src={data.thumb} />
      </div>
      <div className='CardCategory'>
        <TagList tags={data.tag} />
      </div>
      <div className='CardTitle'>{data.title}</div>
      <div className='CardDate'>{utils.getDate(data.startDate) + ' - ' + utils.getDate(data.endDate)}</div>
      <div className='CardPrice'>{data.price}</div>
    </div>
  );
}
;

export default Card;
