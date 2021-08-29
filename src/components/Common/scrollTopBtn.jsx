import { useEffect, useState } from 'react';
import '../../css/ScrollBtn.css';
const ScrollToTop = () => {
  const [visible, toggleVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 20) toggleVisible(true);
      else toggleVisible(false);
    });
  }, []);

  return (visible
    ? <div
        className='ScrollBtn Flex AlignCenter JustifyCenter'
        onClick={() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }}
      ><i className='ToggleTop' />
      </div>
    : ''
  );
};

export default ScrollToTop;
