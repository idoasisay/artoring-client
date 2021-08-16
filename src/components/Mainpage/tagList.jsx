import React from 'react';
import '../../css/mainpage/Tag.css';

const TagList = (props) => {
  return (
    props.tags
      ? props.tags.map((ele, i) =>
        // 오프라인인 경우에만 색상이 변화하지만 다른 값에 대해서도 다른 색으로 변화해야함
        <div className='Caption2-Black Tag' style={{ backgroundColor: ele === '오프라인' ? 'rgb(220, 220, 250)' : ele === '온라인' ? '#ffd3dc' : '' }} key={i}>{ele}</div>
        )
      : ''
  );
}
;
export default TagList
;
