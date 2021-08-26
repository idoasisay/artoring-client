import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../css/about/about.css';

const About = () => {
  const history = useHistory();
  return (
    <div className='AboutContainer'>
      <div className='Flex-Col JustifyCenter AlignCenter Section1'>
        <div
          className='Flex-Col JustifyCenter AlignCenter SectionContainer' style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/img/mainBackground.png'})`,
            backgroundRepeat: 'no-repeat',
            height: '300px',
            width: '900px',
            backgroundPosition: 'center',
            backgroundSize: 'contain'

          }}
        >
          <div className='Title3 OTFR'>아토링은</div>
          <div className='Title3'>청년 예술인을 위한 문화예술계 커리어</div>
          <div className='Title3'>문제해결 플랫폼입니다.</div>
        </div>
      </div>
      <div className='Section2 Flex JustifyCenter'>
        <div className='Flex AlignCenter JustifyCenter SectionContainer'>
          <div style={{ Width: '50%' }}>
            <div style={{ maxWidth: '100%' }}>
              <div className='Title3'>아토링은</div>
              <div className='Title3'>Pay it forward 문화를</div>
              <div className='Title3'>만듭니다.</div>
            </div>
            <div className='body1'>
              문화예술계에 종사하고 있는 선배들이 후배들에게
              자신의 경험과 정보를 공유해주고, 도움을 받은 후배들이 다른 후배들에게 자신의 경험을 나눠주는 것입니다.
            </div>
          </div>
          <img src={process.env.PUBLIC_URL + '/img/character.png'} className='AboutImg' alt='아토링 로고' />
          <div />
        </div>
      </div>
      <div className='Section3 Flex AlignCenter JustifyCenter'>
        <div className='Flex SectionContainer'>
          <div className='Flex-Col JustifyCenter AlignCenter'>
            <img alt='하이파이브' src={process.env.PUBLIC_URL + '/img/mentoring.png'} className='AboutHifive' />
            <div className='Title3' style={{ color: '#868eee' }}>멘토링</div>
            <div className='body1'>문화예술계 현직자와
              1:1 멘토링을 통해 나의 고민과 관심사에 대한
              정보를 나눌 수 있습니다.
            </div>
          </div>
          <div className='Flex-Col JustifyCenter AlignCenter'>
            <img alt='성장하기' src={process.env.PUBLIC_URL + '/img/careerTeach.png'} className='AboutStair' />
            <div className='Title3' style={{ color: '#868eee' }}>커리어 교육</div>
            <div className='body1'>현직자가 직접 예술계에서
              필요한 역량을 가르치며 청년 예술인들의
              커리어 성장에 함께합니다.
            </div>
          </div>
        </div>
      </div>
      <div className='Section4 Flex AlignCenter JustifyCenter'>
        <div className='Flex JustifyCenter AlignCenter SectionContainer'>
          <div className='Flex JustifyCenter AlignCenter' style={{ width: '50%' }}>
            <div><img alt='시그니처 로고' src={process.env.PUBLIC_URL + '/img/whoisart-play.png'} className='AboutPlay' /></div>
          </div>
          <div className='Flex-Col JustifyCenter AlignStart' style={{ width: '50%' }}>
            <div className='Tag Caption2-Black' style={{ backgroundColor: '#e1e0ff' }}>시그니처 프로그램</div>
            <div className='AboutWhoisartTitle'>WHO IS ART?</div>
            <div className='body1'>후즈아트는 지난 2017년 1월 창단되어 현재까지 260명의
              청년 예술인들과 함께 공연과 콘텐츠 그리고 7,000명의 예술인
              커뮤니티를 만들어 왔습니다. 청년 예술인들이 지속적인 예술 활동을  이어나가도록 예술계 포트폴리오와 경험을 제공합니다.
            </div>
            <div className='BtnType2 ToWhois' onClick={() => history.push('/career/signature')}>자세히 보러가기</div>
          </div>
        </div>
      </div>
      <div className='Section1 Flex AlignCenter JustifyCenter'>
        <div className='Flex AlignCenter JustifyCenter SectionContainer'>
          <div style={{ maxWidth: '60%' }}>
            <img alt='함께해요' src={process.env.PUBLIC_URL + '/img/together.png'} className='AboutTogether' />
          </div>
          <div style={{ maxWidth: '50%' }}>
            <div className='Title3' style={{ maxWidth: '100%' }}>문화예술계 커리어 문제해결,
              아토링과 함께해요!
            </div>
            <div className='BtnType5 ToSignup' onClick={() => history.push('/login')}>아토링 시작하기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
