import React from 'react';
import '../../css/Personal/Entry.css';
const InterestedInEntry = ({ data, list, listHandler }, ...args) => {
  function handler () {
    listHandler(data);
  }
  return (
    <div className={data.val === false ? 'EntryContainer' : 'EntryContainer Active'} onClick={handler}>
      {data.name}
    </div>
  );
};

export default InterestedInEntry;
