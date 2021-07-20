import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import exportsObj from '../../components/Common/index';
import exportObj from '../../components/Common';

import axios from 'axios';
import TagList from '../../components/Common/tagList';
import Faq from '../../components/CareerTeach/FAQ';
import ReviewList from '../../components/CareerTeach/ReviesList';

import '../../css/cardDetail/cardDetail.css';

const Editor = exportObj.Editor;

const ViewPost = (props) => {
  const { id } = useParams();
  const [card, cardHandler] = useState({});

  useEffect(() => {
    console.log('test');
    async function getCardInfo () {
      const url = process.env.REACT_APP_NODE_ENV === 'development'
        ? `http://localhost:4000/career/teach/${id}`
        : `https://temp.artoring.com/career/teach/${id}`;
      const { data } = await axios.get(url);
      console.log(data[0]);
      cardHandler(data[0]);
    }

    getCardInfo();
  }, []);
  return (
    !card.title
      ? <div> waiting...</div>
      : <div className='CareerTeachContainer'>
        <div className='CareerTeachHeader Flex'>
          <img src={card.thumb} alt='Card Thumbnail' className='CareerTeachHeaderImg' />
          <div className='CareerTeachHeaderDesc'>
            <div className='Flex'>
              <TagList tags={card.tags} />
            </div>
            <div className='Title3 CareerTeachHeaderTitle'>
              {card.title}
            </div>
            <div className='CareerTeachHeaderDate Title5'>
              {exportsObj.getDate(card.startDate) + ' - ' + exportsObj.getDate(card.endDate)}
            </div>
            <div className='CareerTeachHeaderPrice Title5'>{card.price} 원</div>
            <div className='CareerTeachHeaderLikes'>{card.likes}</div>
          </div>
        </div>
        <div className='CareerTeachMiddelUI Flex'>
          <div className='MiddleUiInner Flex'>
            <a href='#ModeratorIntro' className='MiddleUiBtn Title5'>강연자 소개</a>
            <a href='#TeachDetail' className='MiddleUiBtn Title5'>상세정보</a>
            <a href='#Reviews' className='MiddleUiBtn Title5'>프로그램 후기</a>
            <a href='#FAQ' className='MiddleUiBtn Title5'>FAQ</a>

          </div>
        </div>
        <div id='ModeratorIntro'>
          <div>강연자 소개</div>

          <div id='EditorRenderPosition1'>
            <Editor data={card.detailInfo} holder='EditorRenderPosition1' />
          </div>
        </div>
        <div id='TeachDetail'>
          <div>상세정보</div>

          <div id='EditorRenderPosition2'>
            <Editor data={card.detailInfo} holder='EditorRenderPosition2' />
          </div>
        </div>
        <div id='Reviews'>
          <ReviewList id='Reviews' list={card.reviews} />
        </div>
        <div id='FAQ'><Faq /></div>

      </div>

  );
};

export default ViewPost;
