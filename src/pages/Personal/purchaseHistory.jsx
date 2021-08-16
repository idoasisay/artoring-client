import { useEffect, useState } from 'react';
import axios from 'axios';
import CardList from '../../components/Common/cardList';
import PaginationList from '../../components/CareerTeach/PaginationList';

import '../../css/purchased/purchased.css';

const PurchaseHistory = ({ loginType, profile, accessToken }) => {
  // 페이지 네이션, 현재 페이지
  const [currentPage, currentPageHandler] = useState(1);

  // 페이지 내이션, 10의 자리수 이상의 페이지를 렌더링 하는 기준
  const [basePage, baseHandler] = useState(1);

  const [purchasedLIst, listHandler] = useState([]);

  const [isMentor, toggleIsMenter] = useState(false);

  function pageSetter (num) {
    currentPageHandler(num);
  }

  useEffect(() => {
    async function asyncFetch () {
      const url = process.env.NODE_ENV === 'development' ? `https://localhost:4000/reserve?loginType=${loginType}&id=${profile._id}&page=${currentPage}` : `https://insideart-dev.artoring.com/reserve?loginType=${loginType}&id=${profile._id}&page=${currentPage}`;

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      listHandler(data);
    }

    asyncFetch();
  }, [basePage]);
  return (
    <div className='Flex-Col AlignCenter'>
      <div className='PurchaseTitle Title3'>구매내역</div>
      {/* <div className='Flex ToggleList'>
        <div className={isMentor ? 'PurchaseToggler BtnType2 Btn2Active' : 'BtnType2'}>멘토</div>
        <div className={isMentor ? 'PurchaseToggler BtnType2' : 'BtnType2 Btn2Active'}>커리어 교육</div>
      </div> */}
      {purchasedLIst && purchasedLIst.length > 0 ? <CardList cards={purchasedLIst} likedCareerEdu={profile.likedCareerEdu} likedMentor={profile.likedMentor} renderType={isMentor ? 'mentor' : 'teach'} isPurchasedHistory='true' maxEle='8' deepQuery='true' /> : ''}
      {purchasedLIst && purchasedLIst.length > 0 ? <PaginationList currentPages={currentPage} maxPage={Math.ceil(purchasedLIst.length / 8)} pagesHandler={pageSetter} basePage={basePage} baseHandler={baseHandler} /> : ''}
    </div>
  );
};

export default PurchaseHistory;
