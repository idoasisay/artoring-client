import React from 'react';
import '../../css/mainpage/Tag.css';
const TagList = (props) => {
  return (
    props.tags.map((ele, i) =>
      <div className='Tag' style={{ 'background-color': ele === '오프라인' ? 'rgb(220, 220, 250)' : '' }} key={i}>{ele}</div>
    )

  );
}
;
export default TagList
;
