import React, { useState } from 'react';
import Card from './card.jsx';
import '../../css/mainpage/CardList.css';
import { useHistory } from 'react-router';

const CardList = ({
  cards, title, subTitle,
  likedCareerEdu, likedCareerInfo, likedMentor,
  renderType, maxEle = undefined, sendTo, deepQuery,
  searchDataHandler, filter, filterHandler, isPurchasedHistory, isInfo,
  setDropdown
}) => {
  const [isFiltering, toggleFiltering] = useState(false);

  const history = useHistory();
  const kickToDest = (path) => {
    // 상단 네비게이션 드랍다운을 접음
    setDropdown(0);
    if (sendTo) {
      history.push(sendTo.concat(path));
    } else {
      searchDataHandler([]);
      history.push('/career/growing');
    }
  };

  // data = profile이라 가정
  return (
    <div className='CardList'>
      {filter
      // 검색페이지에서 사용되는 우측 상단의 최신순, 가격 높은순 등의 드랍다운 메뉴
        ? <div>{!subTitle
          ? <div className='Flex' style={{ justifyContent: 'space-between' }}>
            <div className='CardListTitle'>{title}</div>최신순
          </div>
          : <div className='Flex' style={{ justifyContent: 'space-between', paddingRight: '12px' }}>
            <div className='CardListTitle'>{title}<span>{subTitle}</span>
            </div>
            <div
              className='Flex CardFilter AlignCenter body2'
              onClick={() => toggleFiltering(!isFiltering)}
            >
              <div style={{ position: 'static' }}>
                {filter === 'new' ? '최신순' : filter === 'high' ? '가격높은순' : filter === 'low' ? '가격낮은순' : '인기순'}
                <div className={isFiltering ? 'FilterContainerOpen' : 'FilterContainerClose'}>
                  <div className='body2 TextType3' style={{ paddingBottom: '13px' }} onClick={() => filterHandler('new')}>최신순</div>
                  <div className='body2 TextType3' style={{ paddingBottom: '13px' }} onClick={() => filterHandler('high')}>가격높은순</div>
                  <div className='body2 TextType3' style={{ paddingBottom: '13px' }} onClick={() => filterHandler('low')}>가격낮은순</div>
                  <div className='body2 TextType3' style={{ paddingBottom: '13px' }} onClick={() => filterHandler('popular')}>인기순</div>
                </div>
              </div>
              <i className={isFiltering ? 'AccordionBtn BtnOpen' : 'AccordionBtn'} />

            </div>
          </div>}
        </div>
        : !subTitle
            ? <div className='CardListTitle'>{title}</div>
            // 결과 N개 등에서 N개를 표현하기 위해 사용하는 서브 타이틀
            : <div className='CardListTitle'>{title}<span>{subTitle}</span></div>}
      <div className='CardsContainer'>
        <div className='Delimiter' />
        {console.log('---------')}
        {cards.map((ele, i) => {
          if (maxEle) {
            if (i >= maxEle) return;
            else {
              console.log(ele._id);
              if (ele._source)ele._source._id = ele._id;
              return (
                <Card
                  data={!ele._source ? ele : ele._source}
                  key={i}
                  isPurchasedHistory={isPurchasedHistory}
                  isInfo={isInfo}
                  setDropdown={setDropdown}
          /**
           * 프로필에 likedCareerEdu가 존재하지 않다면 서버에 로그인이 되어 있지 않는 상태이므로 당연히 false
           * 하지만 likedCareerEdu가 존재한다면 로그인이 되어있는 상태. 유저가 좋아요한것을 렌더링 해야 하는지
           * 확인해야 한다. 좋아요 표시는 Card 컴포넌트에서 진행하고, 여기서는 렌더링 대상중에
           * 좋아요 표시를 할것이 있는지 체크한다.
           * Card 컴포넌트는 전달받은 liked가 true여야만 하트의 색상이 검은색이아닌 빨간색으로 렌더링이 된다.
          */
                  likeList={likedCareerEdu || likedMentor || likedCareerInfo || []}
            //       liked={
            // renderType !== 'teach'
            //   ? renderType !== 'info'
            //       ? likedMentor
            //           ? !!likedMentor.includes(ele._id)
            //           : false
            //       : likedCareerInfo
            //         ? !!likedCareerInfo.includes(ele._id)
            //         : false
            //   : likedCareerEdu
            //     ? !!likedCareerEdu.includes(ele._id)
            //     : false
            //     }
                />
              )
              ;
            }
          } else {
            return (
              <Card
                data={!ele._source ? ele : ele._source}
                key={i}
                setDropdown={setDropdown}
          /**
           * 프로필에 likedCareerEdu가 존재하지 않다면 서버에 로그인이 되어 있지 않는 상태이므로 당연히 false
           * 하지만 likedCareerEdu가 존재한다면 로그인이 되어있는 상태. 유저가 좋아요한것을 렌더링 해야 하는지
           * 확인해야 한다. 좋아요 표시는 Card 컴포넌트에서 진행하고, 여기서는 렌더링 대상중에
           * 좋아요 표시를 할것이 있는지 체크한다.
           * Card 컴포넌트는 전달받은 liked가 true여야만 하트의 색상이 검은색이아닌 빨간색으로 렌더링이 된다.
          */
                likeList={likedCareerEdu || likedMentor || likedCareerInfo || []}
            //     liked={
            // renderType !== 'teach'
            //   ? renderType !== 'info'
            //       ? likedMentor
            //           ? !!likedMentor.includes(ele._id ? ele._id : -1)
            //           : false
            //       : likedCareerInfo
            //         ? !!likedCareerInfo.includes(ele._id ? ele._id : -1)
            //         : false
            //   : likedCareerEdu
            //     ? !!likedCareerEdu.includes(ele._id ? ele._id : -1)
            //     : false
            //     }
              />
            )
            ;
          }
        })}
      </div>
      {/* 메인페이지 혹은 검색 페이지에서 사용되는 View more 버튼을 렌더링  */}
      {!deepQuery
        ? <div className='Flex Flex-End'>
          {renderType !== 'teach'
            ? renderType !== 'info'
                ? cards.length >= 4
                    ? <div
                        className='BtnType1 CardListMoreBtn'
                        onClick={() => { kickToDest('mentor'); }}
                      >View more1
                    </div>
                    : ''
                : cards.length >= 6
                  ? <div
                      className='BtnType1 CardListMoreBtn'
                      onClick={() => { kickToDest('info'); }}
                    >
                    View more
                    </div>
                  : ''
            : cards.length >= 8
              ? <div
                  className='BtnType1 CardListMoreBtn'
                  onClick={() => { kickToDest('career'); }}
                >
                View more
                </div>
              : ''}
          </div>
        : ''}
    </div>
  );
};

export default CardList;
