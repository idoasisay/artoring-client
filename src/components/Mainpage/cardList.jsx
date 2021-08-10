import React from 'react';
import Card from './card.jsx';
import '../../css/mainpage/CardList.css';

const CardList = ({ data }) => {
  // data = profile이라 가정
  return (
    <div className='CardList'>
      <div className='CardListTitle'>{data.title}</div>
      <div className='CardsContainer'>
        {data.cards.map((ele, i) => <Card
          data={ele}
          key={i}
          /**
           * 프로필에 likedCareerEdu가 존재하지 않다면 서버에 로그인이 되어 있지 않는 상태이므로 당연히 false
           * 하지만 likedCareerEdu가 존재한다면 로그인이 되어있는 상태. 유저가 좋아요한것을 렌더링 해야 하는지
           * 확인해야 한다. 좋아요 표시는 Card 컴포넌트에서 진행하고, 여기서는 렌더링 대상중에
           * 좋아요 표시를 할것이 있는지 체크한다.
           * Card 컴포넌트는 전달받은 liked가 true여야만 하트의 색상이 검은색이아닌 빨간색으로 렌더링이 된다.
          */
          liked={data.likedCareerEdu ? !!data.likedCareerEdu.includes(ele._id ? ele._id : -1) : false}

                                    />)}
      </div>
      <div className='MoreInfo BtnType1'>
        {/**
         * 어디로 연결되어야 할지 몰라 비워둠
         * 하지만 상세 검색페이지라던지 등으로 연결이 필요함
         */}
        <div className=''>View more</div>
      </div>
    </div>
  );
};

export default CardList;
