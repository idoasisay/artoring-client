import { useState, useEffect, useRef } from 'react';
import '../../css/whoisArt/index.css';

const WhoisArt = () => {
  const [people, setPeople] = useState(0);
  const [careselList, listHandler] = useState([{
    title: '학교에서 접할 수 없는 장르를 연주하고, 관객과 연주자 모두 음악을 즐길 수 있다는 점이 흥미로웠어요. ',
    body: "하지만 우리는 조금은 다른 접근을 택하려고 합니다. 탄소 배출의 근원인 석유 등 에너지와 국제 정세는 어떤 관련이 있는지, 기후 변화로 인간이 사라지면 어떤 일이 일어날지, 폭염과 한파, 대규모 산불은 왜 이렇게 자주 발생하는지 등을 '과학'과 '통계'로 알아봅니다. 하지만 우리는 조금은 다른 접근을 택하려고 합니다."
  }, {
    title: '학교에서 접할 수 없는 장르를 연주 ',
    body: '하지만 우리는 조금은 다른 접근을 택하려고 합니다.'
  }, {
    title: '관객과 연주자 모두 음악을 즐길 수 있다는 점이 흥미로웠어요. ',
    body: '하지만 우리는 조금은 다른 접근을 택하려고 합니다. '
  }, {
    title: '학교에서 접할 수 없는 장르를 연주하고, 관객과 연주자 모두 음악을 즐길 수 있다는 점이 흥미로웠어요. ',
    body: "하지만 우리는 조금은 다른 접근을 택하려고 합니다. 탄소 배출의 근원인 석유 등 에너지와 국제 정세는 어떤 관련이 있는지, 기후 변화로 인간이 사라지면 어떤 일이 일어날지, 폭염과 한파, 대규모 산불은 왜 이렇게 자주 발생하는지 등을 '과학'과 '통계'로 알아봅니다. 하지만 우리는 조금은 다른 접근을 택하려고 합니다."
  }]);
  const [setItem, toogleItem] = useState(0);

  useEffect(() => {
    const timer = setInterval(function () {
      const t = document.querySelector('.WhoisArtContainer');
      if (t) {
        if (((window.pageYOffset / t.clientHeight) * 100) >= 20) {
          if (people < 260) setPeople(parseInt(people) + 1);
          else clearInterval(timer);
        }
      } else {
        clearInterval(timer);
      }
    }, 5);

    return () => clearInterval(timer);
  }, [people]);

  return (
    <div className='WhoisArtContainer'>
      <div className='WhoisSection1 Flex JustifyCenter'>
        <div className='Flex AlignCenter JustifyCenter WhoSectionContainer'>
          <div style={{ Width: '50%' }}>
            <div style={{ maxWidth: '100%' }}>
              <div className='Title3'>후즈아트와 함께 예술해요!
              </div>
            </div>
            <div className='body1' style={{ maxWidth: '100%' }}>예술기획단체 후즈아트는</div>
            <div className='OTFEB' style={{ maxWidth: '100%' }}>청년 예술인들이 지속적인 예술 활동을  이어나가도록</div>
            <div className='body1' style={{ maxWidth: '100%' }}>예술계 포트폴리오와 경험을 제공합니다.</div>
          </div>
          <img src={process.env.PUBLIC_URL + '/img/whoisart-main.png'} className='Whoisart-main' alt='아토링 로고' />
          <div />
        </div>
      </div>
      <div className='Section4 Flex AlignCenter JustifyCenter'>
        <div className='Flex JustifyCenter AlignCenter SectionContainer'>
          <div className='Flex JustifyCenter AlignCenter' style={{ width: '50%' }}>
            <div><img alt='후이즈아트' src={process.env.PUBLIC_URL + '/img/whoisart.png'} className='AboutPlay' /></div>
          </div>
          <div className='Flex-Col JustifyCenter AlignStart' style={{ width: '50%' }}>
            <div className='Title2' style={{ paddingBottom: '3.24vh' }}>예술기획단체 후이즈아트 는</div>
            <span className='body1'>지난 <span className='OTFEB'>2017년 1월 창단되어 </span>청년 예술인들과 함께
              <span className='OTFEB'>클래식 공연 기획과 콘텐츠 제작, 그리고 7,000명의
                예술인 커뮤니티
              </span>를 만들어 왔습니다.

            </span>
            <div className='Flex JustifyStart' style={{ width: '100%' }}>
              <a href='https://www.instagram.com/whoisart_official/' className='BtnType4 WhoisBtn1'>History</a>
              <a href='https://www.instagram.com/whoisart_official/' className='BtnType4 WhoisBtn1'>Press</a>
            </div>
          </div>
        </div>
      </div>
      <div className='Section4 Flex AlignCenter JustifyCenter'>
        <div className='Flex JustifyBetween AlignCenter' style={{ maxWidth: '55%' }}>
          <div className='Flex JustifyEnd' style={{ maxWidth: '50%' }}>
            <div className='Flex-Col JustifyCenter' style={{ maxWidth: '100%' }}>
              <div className='JoinPeoples'> 현재까지 </div>
              <div className='JoinPeoples' style={{ color: '#ff4a70' }}>{people}명의 청년 예술인</div>
              <div className='JoinPeoples'>이 참여하였으며,
                만족도가 매우 높습니다.
              </div>
              <div />
            </div>
          </div>
          <div className='Flex-Col JustifyBetween' style={{ maxWidth: '50%', minWidth: '50%', alignSelf: 'stretch' }}>
            <div className='CarouselCont Flex JustifyCenter AlignCenter' style={{ maxWidth: '100%' }}>
              <div className='CarouselBox' style={{ maxWidth: '100%', minHeight: '-webkit-fill-available;' }}>
                <div>"</div>
                <div>{careselList[setItem].title}</div>
                <div>{careselList[setItem].body}</div>
                <div>"</div>
              </div>
            </div>
            <div className='Flex JustifyEnd' style={{ maxWidth: '100%' }}>
              <div className='CarouselBtn Flex JustifyCenter AlignCenter'>
                <div
                  className='CarouselLeft'
                  onClick={() => toogleItem((setItem === 0 ? 3 : setItem - 1))}
                />
              </div>
              <div className='CarouselBtn Flex JustifyCenter AlignCenter'>
                <div
                  className='CarouselRight'
                  onClick={() => toogleItem((setItem + 1) % 3)}
                />
              </div>
            </div>
          </div>
        </div>
        <div />
      </div>

      <div className='WhoisSection2 Flex AlignCenter JustifyCenter'>
        <div className='Flex-Col JustifyBetween AlignCenter SectionContainer' style={{ width: '100%' }}>
          <div className='Flex JustifyCenter WhoisartActivTitle Title2'>주요 활동</div>
          <div className='Flex AlignCenter JustifyBetween' style={{ minWidth: '100%' }}>
            <div className='Flex-Col AlignCenter' style={{ width: '-webkit-fill-available' }}>
              <img alt='공연기획 및 실행' src={process.env.PUBLIC_URL + '/img/whoisart-idea.png'} className='WhoisActiveImg1' />
              <div className='body1'>공연 및 콘텐츠를</div>
              <div className='body1'>기획하고 실행합니다.</div>
            </div>
            <div className='Flex-Col AlignCenter' style={{ width: '-webkit-fill-available' }}>
              <img alt='편곡및 발표' src={process.env.PUBLIC_URL + '/img/whoisart-show.png'} className='WhoisActiveImg2' />
              <div className='body1'>자신이 직접</div>
              <div className='body1'>창작/편곡한 곡을 발표합니다.</div>
            </div>
            <div className='Flex-Col AlignCenter' style={{ width: '-webkit-fill-available' }}>
              <img alt='음악연주' src={process.env.PUBLIC_URL + '/img/whoisart-play.png'} className='WhoisActiveImg3' />
              <div className='body1'>모두가 즐길 수 있는</div>
              <div className='body1'>음악을 연주합니다.</div>
            </div>
          </div>
        </div>
      </div>
      <div className='Flex-Col AlignCenter'>
        <div className='SectionContainer WhoisArtCompletion' style={{ width: '50%' }}>
          <div className='Flex JustifyBetween' style={{ minWidth: '100%' }}>
            <div className='Title3'>5개월 간의 활동 수료 시</div>
            <div>
              <div style={{ borderTop: '2px solid black', minWidth: '100%' }}>
                <div className='WhoisArtDelimiter Flex JustifyStart AlignCenter'>
                  <div className='WhoisartNumber Flex JustifyCenter AlignCenter'>1</div>
                  <div>예술 활동 경험을 검증할  수료증을 드려요.</div>
                </div>
                <div className='WhoisArtDelimiter Flex JustifyStart AlignCenter'>
                  <div className='WhoisartNumber Flex JustifyCenter AlignCenter'>2</div>
                  <div>예술인활동증명 및 네이버 인물등록이 가능합니다.</div>
                </div>
                <div className='WhoisArtDelimiter Flex JustifyStart AlignCenter'>
                  <div className='WhoisartNumber Flex JustifyCenter AlignCenter'>3</div>
                  <div>평균 60시간의 봉사시간을 드려요.</div>
                </div>
                <div className='WhoisArtDelimiter Flex JustifyStart AlignCenter'>
                  <div className='WhoisartNumber Flex JustifyCenter AlignCenter'>4</div>
                  <div>구직과정에서 중요한 경험으로 활용돼요.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='Flex JustifyCenter' style={{ width: '100%' }}>
          <a href='https://www.instagram.com/whoisart_official/' className='BtnType3 WhoisBtn2'>
            문의하기
          </a>
          <a href='https://www.instagram.com/whoisart_official/' className='BtnType5 WhoisBtn2'>
            후즈아트 지원하기
          </a>
        </div>
      </div>
    </div>
  );
};

export default WhoisArt;
