import React from 'react';

const TagList = (props) => {
  return (
    props.tags.map((ele, i) =>
      <div className='Tag' key={i}>{ele}</div>
    )

  );
}
;
export default TagList
;
