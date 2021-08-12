import axios from 'axios';
import { useEffect, useState } from 'react';
import PaginationList from '../../components/CareerTeach/PaginationList';
import CardList from '../../components/Common/cardList';

import '../../css/career/growing.css';

const CareerTeach = ({ profile, searchDataHandler }) => {
  // 카테고리에 따라 분류될 카드가 저장될 상태
  const [categoryList, categoryListUpdater] = useState([]);

  // 가격순, 높은가격순 등 필터링에 사용할 상태
  const [filter, filterHandler] = useState('new');

  // 모든 카드들의 수
  const [total, totalHandler] = useState(0);

  // tags에 교육이 들어가 있는 카드의 수
  const [eduTotal, eduTotalHandler] = useState(0);

  // tags에 특강이 들어가 있는 카드의 수
  const [lectureTotal, lectureTotalHandler] = useState(0);

  // tags에 모임이 들어가 있는 카드의 수
  const [getherTotal, getherTotalHandler] = useState(0);

  // 버튼에 따라 바뀌는 카테로리를 추적하기 위한 상태
  const [category, categoryToggler] = useState('');

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

  // 렌더링 이후 서버에서 데이터를 요청한 이후 단 한번 모든 카드의 총합, 카테고리별 카드의 수, 페이지 네이션 설정

  useEffect(() => {
    async function asyncFetch () {
      const url = process.env.NODE_ENV === 'development'
        ? 'https://localhost:4000/career/teach'
        : 'https://insideart-dev.artoring.com/career/teach';

      const { data: response } = await axios.get(url);

      totalHandler(response.total.basic);
      eduTotalHandler(response.total.edu);
      lectureTotalHandler(response.total.lecture);
      getherTotalHandler(response.total.gether);

      maxPageHandler(Math.ceil(response.total.basic / 16));
    }
    asyncFetch();
  }, []);

  // 카테고리 및 필터가 변경될 때 마다 페이지네이션 초기화 및 렌더링할 카드들을 업데이트
  useEffect(() => {
    async function asyncFetch () {
      const url = process.env.NODE_ENV === 'development'
        ? 'https://localhost:4000/career/teach'
        : 'https://insideart-dev.artoring.com/career/teach';

      if (category === '') {
        const { data } = await axios.get(url.concat(`?page=1&orderby=${filter}`));
        categoryListUpdater(data.cardList);
        currentPageHandler(1);
        maxPageHandler(Math.ceil(total / 16));
        baseHandler(1);
      } else {
        let categoryToQuery;
        if (category === 'teach') categoryToQuery = '교육';
        else if (category === 'lecture') categoryToQuery = '특강';
        else categoryToQuery = '모임';

        const { data } = await axios.get(url.concat(`?page=1&category=${categoryToQuery}&orderby=${filter}`));
        categoryListUpdater(data.cardList);
        currentPageHandler(1);
        maxPageHandler(Math.ceil(eduTotal / 16));
        baseHandler(1);
      }
    }
    asyncFetch();
  }, [category, filter]);

  // 페이지 변경때마다 해당되는 페이지들을 서버에 요청하고 렌더링 시킴
  // category 옵션을 주면 해당되는 카테고리만 가져오고 그렇지 않으면
  // 순서대로 16개의 카드를 가져옴
  useEffect(() => {
    async function asyncFetch () {
      const url = process.env.NODE_ENV === 'development'
        ? 'https://localhost:4000/career/teach'
        : 'https://insideart-dev.artoring.com/career/teach';

      const { data: response } = await axios.get(url.concat(category === '' ? `?page=${currentPages}&orderby=${filter}` : `?page=${currentPages}&category=${category}&orderby=${filter}`));
      categoryListUpdater(response.cardList);
    }
    asyncFetch();
  }, [currentPages]);

  return (
    <div className='TeachContainer'>
      <div className='Flex Flex-Start CategoryBtnContainer'>
        <div
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
        </div>
      </div>
      {categoryList
        ? <CardList
            title='전체'
            subTitle={`(${category === '' ? total : category === 'teach' ? eduTotal : category === 'gether' ? getherTotal : lectureTotal}개)`}
            cards={categoryList}
            likedCareerEdu={profile ? profile.likedCareerEdu : []}
            renderType='teach'
            maxEle={16}
            searchDataHandler={searchDataHandler}
            deepQuery='true'
            filter={filter}
            filterHandler={filterHandler}
          />
        : <div style={{ minWidth: '99vw', minHeight: '99vh' }} />}
      <div className='PageNationContainer'>
        <PaginationList maxPage={maxPage} currentPages={currentPages} pagesHandler={pagesHandler} basePage={basePage} baseHandler={baseHandler} />
      </div>
    </div>
  );
};

export default CareerTeach
;
