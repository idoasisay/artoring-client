
const PaginationList = ({ currentPages, maxPage, pagesHandler, basePage, baseHandler }) => {
  // 베이스. 페이지네이션의 기준. 페이지네이션의 10의 자리수 이상의 영역을 관장
  // 커렌트, 페이지네이션의 1의 자릿수를 관장. 베이스와 조합으로 현제 보여줄 페이지 정보를 완성

  // '>' 이 눌렸을때 실행됨.
  function nextPage () {
    baseHandler(basePage + 10);

    pagesHandler(basePage + 10);
  }

  // '<'이 눌렸을때 실행.
  function beforePage () {
    baseHandler(basePage - 10);
    pagesHandler(basePage - 10);
  }

  // 1,2,3과 같은 숫자를 눌렀을때 currentPage 상태를 변경
  function setPage (num) {
    pagesHandler(num);
  }

  // '<<' 버튼이 눌렸을때 실행
  function goFirst () {
    baseHandler(1);
    pagesHandler(1);
  }

  // '>>' 버튼이 눌렸을때 실행
  function goLast () {
    let current = maxPage;
    current = Math.trunc(current / 10);
    current *= 10;
    baseHandler(current + 1);
    pagesHandler(current + 1);
  }
  // 렌더링될 엘리먼트들을 담을 리스트
  const list = [];

  // 베이스가 11 이상인지에 따라 이전페이지, 맨앞페이지를 렌더링이 결정됨
  if (basePage > 10) {
    list.push(<div key='ll' className='Flex PaginationUI'><div kdy='l' onClick={goFirst}>&laquo;</div><div onClick={beforePage}>&#60;</div></div>);
  }

  // props.maxPage에 따라 최대 10개 까지의 페이지를 동적으로 렌더링
  for (let i = basePage; i < basePage + 10 && i <= maxPage; i++) {
    list.push(<div key={i} className={currentPages === i ? 'PaginationItem PageIndicator' : 'PaginationItem'} onClick={() => setPage(i)}>{i}</div>);
  }
  // 더이상 넘어갈 페이지가 존재하는지에 따라 '>', '>.' 버튼 렝더링이 결정됨
  if ((maxPage >= basePage + 10)) { list.push(<div key='r' className='Flex PaginationUI'><div onClick={nextPage}>&#62;</div><div key='rr' onClick={goLast}>&raquo;</div></div>); }

  return (
    <div className='PaginationContainer'>{list}</div>
  );
};

export default PaginationList;
