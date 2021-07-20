
import Editor from './TextEditor/Editor';

function getDate (date) {
  const word = ['월', '화', '수', '목', '금', '토', '일'];

  const now = new Date(date);

  const year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDay();
  const index = now.getDay();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  return `${year}.${month}.${day}(${word[index]})`;
}

const exportObj = { getDate, Editor };
export default exportObj;
