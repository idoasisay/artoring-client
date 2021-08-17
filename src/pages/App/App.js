import React, { useEffect } from 'react';
import '../../css/App.css';
import Nav from '../../components/PageNavi/pageNaviComponent';
import { BrowserRouter } from 'react-router-dom';
import Kakao1by1Btn from '../../components/Common/ToKakaoBtn';
import ScrollToTop from '../../components/Common/scrollTopBtn';

function App () {
  return (
    <BrowserRouter>
      <div className='App'>
        <ScrollToTop />
        <header className='App-header'>
          <Nav />
        </header>
      </div>
      <Kakao1by1Btn />

    </BrowserRouter>
  );
}

export default App;
