import React, { useState } from 'react';
import InterestedInEntry from './interestringEntry';

const InterestedList = ({ list, listHandler }) => {
  console.log(list);
  function handler (data) {
    console.log('test');
    listHandler(list.map(ele => {
      if (ele.name === data.name) return { ...data, val: !data.val };
      else return ele;
    }));
  }

  return (
    <div className='InterestedListContainer'>
      {list.map((index, i) => <InterestedInEntry key={i} data={index} list={list} listHandler={handler} />)}
    </div>
  );
};

export default InterestedList
;
