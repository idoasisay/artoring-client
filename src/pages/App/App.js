import React, { useRef, useState, useEffect } from 'react';
import '../../css/App.css';
import Nav from '../../components/PageNavi/pageNaviComponent';
import { BrowserRouter } from 'react-router-dom';
import Kakao1by1Btn from '../../components/Common/ToKakaoBtn';
import ScrollToTop from '../../components/Common/scrollTopBtn';

function App () {
  const ref = useRef(null);
  const [isWide, wideToggler] = useState(false);

  // 와이드 모니터 사용시 모니터 높이 기준 16: 9로 강제 렌더링
  useEffect(() => {
    if (ref.current) {
      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;

      const ratio = height / width;

      if (ratio <= 0.54) {
        wideToggler(true);
      }
    }
  }, [ref.current]);

  return (
    <BrowserRouter>
      <div className='Flex JustifyCenter'>
        <div className={!isWide ? 'App' : 'App Wide Flex-Col AlignCenter'}>
          <ScrollToTop />
          <header className='App-header'>
            <Nav />
          </header>
        </div>
      </div>
      <Kakao1by1Btn />

    </BrowserRouter>
  );
}

export default App;
