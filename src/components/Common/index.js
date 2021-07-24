
import Editor from './TextEditor/Editor';
/**
 * ! 여기 파일들은 주로 공통으로 사용되는 컴포넌트 및
 * ! 함수들이 모여있는 곳입니다.
 */

/**
 *
 * @param {Date} date
 * @returns  'XXXX년.XX월.XX일.{월||화||...}
 * Date 포맷의 데이터를 받아 특정 형식으로 바꿔주는 핸들러.
 * 리뷰 컴포넌트를 제외한 커러어 교육등의 컴포넌트에서 사용한다.
 */
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

// mouseDown, mouseUp 이벤트등에 손쉽게 대응하기 위한 핸들러.
// 왜 사용되는지 의문이라면 App.css를 참고할것. 제플린 가이드에 따라 자주 사용되는 CSS양식을 작성해둠.

const classReplacer = (target, replace) => {
  const container = document.querySelector(target);
  container.className = replace;
};

// Editor는 서버에서 전달받은 카드 상세 정보를 ReadOnly 상태로 보여주기 위해 사용됨.
// 에디터가 TinyMCE로 치환됨에 따라 제거예정.
const utils = { getDate, Editor, classReplacer };
export default utils;
