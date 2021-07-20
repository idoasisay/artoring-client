
const PaginationList = ({ currentPages, maxPage, pagesHandler, basePage, baseHandler }) => {
  function nextPage () {
    baseHandler(basePage + 10);

    pagesHandler(basePage + 10);
  }
  function beforePage () {
    baseHandler(basePage - 10);
    pagesHandler(basePage - 10);
  }
  function setPage (num) {
    pagesHandler(num);
  }
  function goFirst () {
    baseHandler(1);
    pagesHandler(1);
  }
  function goLast () {
    let current = maxPage;
    current = Math.trunc(current / 10);
    current *= 10;
    baseHandler(current + 1);
    pagesHandler(current + 1);
  }
  const list = [];
  if (basePage > 10) {
    list.push(<div className='Flex PaginationUI'><div onClick={goFirst}>&laquo;</div><div onClick={beforePage}>&#60;</div></div>);
  }
  for (let i = basePage; i < basePage + 10 && i < maxPage; i++) {
    list.push(<div className={currentPages === i ? 'PaginationItem PageIndicator' : 'PaginationItem'} onClick={() => setPage(i)}>{i}</div>);
  }
  if ((maxPage > basePage + 10)) { list.push(<div className='Flex PaginationUI'><div onClick={nextPage}>&#62;</div><div onClick={goLast}>&raquo;</div></div>); }

  return (
    <div className='PaginationContainer'>{list}</div>
  );
};

export default PaginationList;
