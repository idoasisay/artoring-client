import React from 'react';

const ReviewListEntry = ({ thumb = 'https://artoring.com/image/1626247507674.jpeg', name, date, text }) => {
  let modifiedDate = '';
  const tmpDate = new Date(date);
  const year = tmpDate.getFullYear();
  let month = tmpDate.getMonth();
  let day = tmpDate.getDay();
  const hour = tmpDate.getHours();
  let minute = tmpDate.getMinutes();
  if (month < 10) month = '0'.concat(month);
  if (day < 10) day = '0'.concat(day);
  if (minute < 10) minute = '0'.concat(minute);

  modifiedDate = modifiedDate.concat(year, '.', month, '.', day, ' ', hour, ':', minute);
  return (
    <div className='ReviewContainer'>
      <img src={thumb} alt='userThumb' className='ReviewThumb' />
      <div className='ReviewDescContainer'>
        <div className='Flex PaddingBottom12px'>
          <div className='Reviewer'>{name}</div>
          <div className='ReviewDate'>{modifiedDate}</div>
        </div>
        <div className='ReviewDetail'>{text}</div>
      </div>
    </div>
  );
};

export default ReviewListEntry;
