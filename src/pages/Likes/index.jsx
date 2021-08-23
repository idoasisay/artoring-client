import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import CardList from '../../components/Common/cardList';
import PaginationList from '../../components/CareerTeach/PaginationList';

import '../../css/Likes/likes.css';

const LikesPage = ({ isLogin, loginType, profile, accessToken }) => {
  const history = useHistory();

  if (!isLogin) history.push('/login');

  const [likedList, likesHandler] = useState([]);
  const [filter, filterToggler] = useState('teach');

  const [careerTotal, careerHandler] = useState(0);
  const [mentorTotal, mentorHandler] = useState(0);
  const [infoTotal, infoHandler] = useState(0);

  const [currentPages, pagesHandler] = useState(1);
  const [basePage, baseHandler] = useState(1);

  const setPage = (num) => {
    pagesHandler(num);
  };

  useEffect(() => {
    async function asyncFetch () {
      const url = process.env.NODE_ENV === 'development'
        ? `https://localhost:4000/profile/likes?loginType=${loginType}&id=${profile._id}`
        : `https://back.arotring.com/profile/likes?loginType=${loginType}&id=${profile._id}`;

      const { data: result } = await axios.get(url, {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });
      careerHandler(result.likedCareerEdu);
      mentorHandler(result.likedMentor);
      infoHandler(result.likedInfo);
    }

    asyncFetch();
  }, []);

  useEffect(() => {
    async function asyncFetch () {
      const url = process.env.NODE_ENV === 'development'
        ? `https://localhost:4000/profile/likes?loginType=${loginType}&id=${profile._id}&queryType=${filter}&page=${currentPages}`
        : `https://back.arotring.com/profile/likes?loginType=${loginType}&id=${profile._id}&queryType=${filter}&page=${currentPages}`;

      const { data: userData } = await axios.get(url, {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });

      for (const [key, value] of Object.entries(userData)) {
        if (key !== '_id') likesHandler(value);
      }
    }
    asyncFetch();
  }, [profile, currentPages, filter]);

  return (
    <div className='Flex-Col LikesContainer AlignCenter'>
      <div className='Title3 LikesTitle'>{profile.name} 님의 좋아요</div>
      <div className='Flex JustifyBetween LikeFilterContainer body1'>
        <div className={filter === 'mentor' ? 'BtnType3 Btn3Active LikeFilter' : 'LikeFilter BtnType3'} onClick={() => { likesHandler([]); filterToggler('mentor'); }}>멘토</div>
        <div className={filter === 'teach' ? 'BtnType3 Btn3Active LikeFilter' : 'LikeFilter BtnType3'} onClick={() => { likesHandler([]); filterToggler('teach'); }}>커리어교육</div>
        <div className={filter === 'info' ? 'BtnType3 Btn3Active LikeFilter' : 'LikeFilter BtnType3'} onClick={() => { likesHandler([]); filterToggler('info'); }}>커리어정보</div>
      </div>
      {likedList.length > 0
        ? <div>
          <CardList
            cards={likedList}
            renderType={filter}
            maxEle={filter === 'teach' ? 16 : filter === 'mentor' ? 16 : 6}
            deepQuery='true'
            isInfo={filter === 'info'}
          />
          <PaginationList
            currentPages={currentPages}
            maxPage={filter === 'teach' ? Math.ceil(careerTotal / 16) : filter === 'mentor' ? Math.ceil(mentorTotal / 16) : Math.ceil(infoTotal / 6)} baseHandler={baseHandler} basePage={basePage} pagesHandler={setPage}
          />
          </div>
        : <div className='EmptyPage Flex AlignCenter JustifyCenter'>
          <div>
            {filter === 'teach'
              ? careerTotal === 0
                  ? '데이터가 없습니다'
                  : '로딩중...'
              : filter === 'mentor'
                ? mentorTotal === 0
                    ? '데이터가 업습니다'
                    : '로딩중...'
                : infoTotal === 0
                  ? '데이터가 업습니다'
                  : '로딩중....'}
          </div>
        </div>}
    </div>
  );
};

export default LikesPage;
