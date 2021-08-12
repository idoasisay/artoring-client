import React, { useEffect, useState } from 'react';
import '../css/search/Search.css';
import axios from 'axios';
import CardList from '../components/Common/cardList';
import { useHistory } from 'react-router';

const Search = ({ searchData = '', profile, searchingToggler, searchDataHandler }) => {
  const history = useHistory();

  const [careerTeachCards, careerCardTeachListHandler] = useState({});
  // const [mentorCards, mentorCardListHandler] = useState({});
  const [careerInfoCards, careerInfoCardListHandler] = useState({});
  const [total, totalUpdater] = useState(0); // 검색결과 모든 도큐먼트의 총합을 추적
  const [isDeepQuery, toggleDeepQuery] = useState(history.location.pathname.includes('deep'));

  useEffect(() => {
    async function asyncFetch () {
      const url = process.env.REACT_APP_NODE_ENV === 'development'
        ? 'https://localhost:4000/search'
        : 'https://back.artoring.com/search';

      if (!history.location.pathname.includes('deep')) {
        const { data: response } = await axios.get(url.concat(`?keyword=${searchData}`));
        const { teachQueryResult, mentorQueryResult } = response;

        const sum = teachQueryResult.total.value;
        // sum += mentorQueryResult.total.value;
        careerCardTeachListHandler(teachQueryResult);
        // mentorCardListHandler(mentorQueryResult);
        totalUpdater(sum);
      } else {
        const { data: response } = await axios.get(url.concat(history.location.search));

        const { total, hits } = response;

        const model = history.location.search.split('&')[1].split('=')[1];
        model === 'career' ? careerCardTeachListHandler(hits) : careerInfoCardListHandler(hits);
        totalUpdater(total.value);
      }
    }

    asyncFetch();
    return () => {
      searchingToggler(false);
      toggleDeepQuery(false);
    };
  }, [searchData]);

  return (
    total !== 0
      ? <div className='SearchContainer Flex-Col AlignCenter'>
        <div className='SearchTitle'>
          <span className='Title2'>'{searchData}'</span> 검색결과 <span className='Title4 QueryDisplay'>{total}개</span>
        </div>
        {/* {mentorCards.hits ? <CardList
        title={`멘토 찾기 ${mentorCards.total.value}개`}
        cards={mentorCards.hits}
        likedCareerEdu={profile.likedCareerEdu}
        renderType='mentor'
                          /> : ''} */
}
        {careerTeachCards.hits
          ? <CardList
              title='커리어 교육 '
              subTitle={`${careerTeachCards.total.value}개`}
              cards={careerTeachCards.hits}
              likedCareerEdu={profile.likedCareerEdu}
              renderType='teach'
              maxEle='8'
              sendTo={`/search/deep?keyword=${searchData}&model=`}
            />
          : isDeepQuery && careerTeachCards.length
            ? <CardList
                title='커리어 교육 '
                subTitle={`${total}개`}
                cards={careerTeachCards}
                likedCareerEdu={profile.likedCareerEdu}
                renderType='teach'
                maxEle='16'
                deepQuery='true'
              />
            : ''}
        </div>
      : <div style={{ minWidth: '99vw', minHeight: '99vh' }} />
  );
};

export default Search;
