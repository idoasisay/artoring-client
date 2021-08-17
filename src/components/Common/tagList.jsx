import React from 'react';
import '../../css/mainpage/Tag.css';
/**
 *
 * @param {*} props
 * @returns ReactComponet
 * 태그가 사용되는곳이라면 어디서나 사용되는 컴포넌트
 */
const TagList = (props) => {
  return (
    props.tags
      ? props.tags.map((ele, i) =>
        <div className='Caption2-Black Tag' style={{ backgroundColor: ele === '오프라인' ? 'rgb(220, 220, 250)' : ele === '온라인' ? '#ffd3dc' : '' }} key={i}>{ele}</div> )
      : ''
  );
}
;
export default TagList
;
