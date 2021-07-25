import React from 'react';
import '../../css/Personal/Entry.css';
const InterestedInEntry = ({ data, listHandler }) => {
  function handler () {
    listHandler(data);
  }
  return (
    <div className={data.val === false ? 'EntryContainer BtnType2' : 'EntryContainer BtnType2 Btn2Active'} onClick={handler}>
      {data.name}
    </div>
  );
};

export default InterestedInEntry;
