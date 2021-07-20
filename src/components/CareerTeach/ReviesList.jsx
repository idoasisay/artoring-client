import { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewListEntry from './RevieListEntry';
import PaginationList from './PaginationList';

const uri = process.env.REACT_APP_NODE_ENV === 'development'
  ? 'http://localhost:4000/reviews/'
  : 'http://temp.artoring.com/reviews/';

const ReviewList = ({ list }) => {
  const [maxPage, maxPageHandler] = useState(Math.ceil(list.length / 5));
  const [currentPages, pagesHandler] = useState(1);
  const [basePage, baseHandler] = useState(1);
  const [reviews, reviewHandler] = useState([]);

  console.log(maxPage);
  useEffect(() => {
    async function getReviews () {
      const target = list.slice((currentPages - 1) * 5, (currentPages - 1) * 5 + 5);
      const data = encodeURIComponent(JSON.stringify(target));

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
