import axios from 'axios';
import { useEffect, useState } from 'react';
import PaginationList from '../../components/CareerTeach/PaginationList';
import CardList from '../../components/Common/cardList';

import '../../css/career/growing.css';

const CareerInfo = ({ profile, searchDataHandler }) => {
  // 카드 뉴스 저장용
  const [cardList, listHandler] = useState([]);

  // 페이지 네이션, 현재 페이지
  const [currentPages, currentPageHandler] = useState(1);

  // 페이지 네이션 최대 페이지 추적
  const [maxPage, maxPageHandler] = useState(0);

  // 페이지 내이션, 10의 자리수 이상의 페이지를 렌더링 하는 기준
  const [basePage, baseHandler] = useState(1);

  // 페이지 네이션에서 현재 페이지를 변경
  function pagesHandler (num) {
    currentPageHandler(num);
  }

  useEffect(() => {
    async function asyncFetch () {
      const url = process.env.NODE_ENV === 'development'
        ? 'https://localhost:4000/career/info'
        : 'https://insideart-dev.artoring.com/career/info';

      const { data: response } = await axios.get(url);
      maxPageHandler(Math.ceil(response.total / 9));
    }

    asyncFetch();
  }, []);

  // 페이지 변경때마다 해당되는 페이지들을 서버에 요청하고 렌더링 시킴
  // category 옵션을 주면 해당되는 카테고리만 가져오고 그렇지 않으면
  // 순서대로 16개의 카드를 가져옴
  useEffect(() => {
    async function asyncFetch () {
      const url = process.env.NODE_ENV === 'development'
        ? 'https://localhost:4000/career/info'
        : 'https://insideart-dev.artoring.com/career/info';

      const { data: response } = await axios.get(url.concat(`?page=${currentPages}`));
      listHandler(response.cardList);
    }
    asyncFetch();
  }, [currentPages]);

  return (
    <div className='TeachContainer'>
      <div className='Flex Flex-Start CategoryBtnContainer'>
        {/* <div
          className={category === '' ? 'BtnType2 BtnType1 CategoryBtn' : 'BtnType2 CategoryBtn CategoryActive'}
          onClick={() => categoryToggler('')}
        >View All
        </div>
        <div
          className={category === 'teach' ? 'BtnType2 BtnType1 CategoryBtn' : 'BtnType2 CategoryBtn CategoryActive'}
          onClick={() => categoryToggler('teach')}
        >교육
        </div>
        <div
          className={category === 'gether' ? 'BtnType2 BtnType1 CategoryBtn' : 'BtnType2 CategoryBtn CategoryActive'}
          onClick={() => categoryToggler('gether')}
        >모임
        </div>
        <div
          className={category === 'lecture' ? 'BtnType2 BtnType1 CategoryBtn' : 'BtnType2 CategoryBtn CategoryActive'}
          onClick={() => categoryToggler('lecture')}
        >특강
        </div> */}
      </div>
      {cardList
        ? <div>
          <CardList
            cards={cardList}
            likedCareerInfo={profile ? profile.likedCareerInfo : []}
            renderType='info'
            maxEle={9}
            searchDataHandler={searchDataHandler}
            deepQuery='true'
            isInfo='true'
          />
          <div className='PageNationContainer'>
            <PaginationList
              maxPage={maxPage}
              currentPages={currentPages}
              pagesHandler={pagesHandler}
              basePage={basePage}
              baseHandler={baseHandler}
            />
          </div>
        </div>
        : <div style={{ minWidth: '99vw', minHeight: '99vh' }} />}

    </div>
  );
};

export default CareerInfo
;
