import React, { useState } from 'react';

const Faq = (props) => {
  // 각 컨테이너마다 번호를 할당하고 넘겨받은 번호에 해당되는 컨테이너 속성을 변경
  const handler = (num) => {
    active === num ? activeHandler(0) : activeHandler(num)
    ;

    const panel = document.querySelectorAll('.AccordionText');

    const keys = Object.keys(panel);
    for (const index in keys) {
      if (index != num - 1) panel[index].style.maxHeight = null;
      else {
        if (panel[num - 1].style.maxHeight) {
          panel[num - 1].style.maxHeight = null;
          panel[num - 1].style.paddingTop = '0px';
        } else {
          panel[index].style.maxHeight = panel[index].scrollHeight + 'px';
          panel[index].style.paddingTop = '20px';
        }
      }
    }
  };

  // 타이틀 선택여부를 추적하기 위한 상태
  const [active, activeHandler] = useState(0);
  return (
    <div>
      <div className='FaqContianer'>
        <div className='FaqTitle Title3'>FAQ</div>
        <div>
          <div
            className='AccordionContainer' onClick={() => handler(1)}
          >
            <div className='AccordionTitle'>멘토링 시간을 추가 할 수 있나요?</div>
            <i className={active === 1 ? 'AccordionBtn BtnOpen' : 'AccordionBtn'} />
          </div>
          <div className='Flex JustifyCenter'>
            <div className={active === 1 ? 'AccordionText AccordionOpen' : 'AccordionText'}>some text</div>
          </div>
        </div>
        <div>
          <div
            className='AccordionContainer' onClick={() => handler(2)}
          >
            <div className='AccordionTitle'>멘토링 이후 개별 연락이 가능할까요?</div>
            <i className={active === 2 ? 'AccordionBtn BtnOpen' : 'AccordionBtn'} />
          </div>
          <div className='Flex JustifyCenter'>
            <div className={active === 2 ? 'AccordionText AccordionOpen' : 'AccordionText'}>some text</div>
          </div>
        </div>
        <div>
          <div
            className='AccordionContainer' onClick={() => handler(3)}
          >
            <div className='AccodionTtitle'>프로그램 교환 환불 기간은 어떻게 되나요?</div>
            <i className={active === 3 ? 'AccordionBtn BtnOpen' : 'AccordionBtn'} />
          </div>
          <div className='Flex JustifyCenter'>
            <div className={active === 3 ? 'AccordionText AccordionOpen' : 'AccordionText'}>some text</div>
          </div>
        </div>
        <div>
          <div
            className='AccordionContainer' onClick={() => handler(4)}
          >
            <div className='AccodionTtitle'>멘토링 신청은 선착순 인가요?</div>
            <i className={active === 4 ? 'AccordionBtn BtnOpen' : 'AccordionBtn'} />
          </div>
          <div className='Flex JustifyCenter'>
            <div className={active === 4 ? 'AccordionText AccordionOpen' : 'AccordionText'}>some text<br />alkdjflkadsjflk</div>
          </div>
        </div>
        <div>
          <div
            className='AccordionContainer' onClick={() => handler(5)}
          >
            <div className='AccordionTitle'>멘토링 시간을 추가할 수 있나요?</div>
            <i className={active === 5 ? 'AccordionBtn BtnOpen' : 'AccordionBtn'} />
          </div>
          <div className='Flex JustifyCenter'>
            <div className={active === 5 ? 'AccordionText AccordionOpen' : 'AccordionText'}>some text</div>
          </div>
          <div
            className='AccordionContainer'
          />
        </div>
      </div>
    </div>
  );
}
;
export default Faq
;
