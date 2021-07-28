import React from 'react';
import InterestedInEntry from './interestringEntry';

const InterestedList = ({ list, listHandler }) => {
  function handler (data) {
    listHandler(list.map(ele => {
      // 관심사리스트는 [{ name: '창업', val: false .]과 같은 배열
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
