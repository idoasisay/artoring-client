import { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewListEntry from './RevieListEntry';
import PaginationList from './PaginationList';

const uri = process.env.REACT_APP_NODE_ENV === 'development'
  ? 'https://localhost:4000/reviews/'
  : 'https://back.artoring.com/reviews/';

const ReviewList = ({ list }) => {
  /**
   * * Props.list는 리뷰들의 id (_id가 아님)이 담긴 배열을 리턴함
   * * maxPage는 모든 리뷰를 렌더링하기 위헤 배열의 길이를 5로 나눈 올림값으로 지정
  */
  const [maxPage, maxPageHandler] = useState(Math.ceil(list.length / 5));
  const [currentPages, pagesHandler] = useState(1);
  const [basePage, baseHandler] = useState(1);
  const [reviews, reviewHandler] = useState([]);

  useEffect(() => {
    async function getReviews () {
      const target = list.slice((currentPages - 1) * 5, (currentPages - 1) * 5 + 5);

      // 배열을 파리미터로 보내기 위해 URI인코딩을 실행
      const data = encodeURIComponent(JSON.stringify(target));

      // 서버에 인코딩된 배열 데이터를 주고 해당 id를 가진 리뷰데이터를 요청
      const response = await axios.get(uri.concat(data));
      reviewHandler(response.data);
    }
    getReviews();
  }, [currentPages]);
  return (
    <div>
      {reviews ? reviews.map((index, key) => <ReviewListEntry key={key} thumb={index.userThumb} name={index.userName} text={index.text} date={index.modifiedAt} />) : ''}
      <PaginationList maxPage={maxPage} currentPages={currentPages} pagesHandler={pagesHandler} basePage={basePage} baseHandler={baseHandler} />
    </div>
  );
};

export default ReviewList
;
