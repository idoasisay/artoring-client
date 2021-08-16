import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TagList from '../Mainpage/tagList.jsx';

import utils from './index.js';

import '../../css/mainpage/Card.css';

// 메인페이지에서 사용되는 카드를 렌더링하는 컴포넌트
const Card = ({ data, liked, isPurchasedHistory }) => {
  const history = useHistory();
  const curDate = new Date();
  const endDate = new Date(data.endDate);

  // 개인이 좋아요한걸 표현하기 위해 사용되는 상태.
  // 핸들러는 클릭하면 해당 카드의 상세페이지로 전환되어야 하기 때문에
  // 사용되지 않음
  const [likes, likesHandler] = useState(liked);

  return !isPurchasedHistory
    ? <div
        className={isPurchasedHistory ? 'PurchaseHisotryContianer' : 'Card'} onClick={() => {
          history.push(`/career/growing/${data._id}`);
        }}
      > <div>
        <img
          src='/img/like.svg' alt='likeImg' className={likes ? 'CardLikes LikeActive' : 'CardLikes'}
        />
        <div>
          <img className='CardThumb' alt='cardThumbnail' src={data.thumb} />
        </div>
        <div className='CardCategory'>
          <TagList tags={data.tags} />
        </div>
        <div className='CardTitle'>{data.title}</div>
        <div className='CardDate'>{utils.getDate(data.startDate) + ' - ' + utils.getDate(data.endDate)}</div>
        <div className='CardPrice'>{!isNaN(Number(data.price)) ? `${data.price}원` : `${data.price}`}</div>
        </div>

      </div>
    : <div
        className={isPurchasedHistory ? 'PurchaseHisotryContianer' : 'Card'} onClick={() => {
          history.push(`/career/growing/${data._id}`);
        }}
      >
      <div className='Flex JustifyBetween'>
        <div className='Flex '>
          <img className='PurchasedCardThumb' alt='cardThumbnail' src={data.thumb} />
          <div className='PurchasedDesc'>
            <div className='CardCategory'>
              <TagList tags={data.tags} />
            </div>
            <div className='CardTitle Title4'>{data.title}</div>
            <div className='Caption2-Grey'>{utils.getDate(data.startDate) + ' - ' + utils.getDate(data.endDate)}</div>
            <div className='Caption1'>{isNaN(Number(data.price)) ? `${data.price}원` : `${data.price}`}</div>
          </div>
        </div>
        <div className={curDate > endDate ? 'ReqReview Flex JustifyCenter AlignCenter' : 'None'}>
          <div>
            리뷰 작성
          </div>
        </div>
      </div>
      {isPurchasedHistory ? <div className='Delimiter' /> : ''}
    </div>;
};

export default Card;
