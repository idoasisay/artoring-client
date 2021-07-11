import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <div className='nav'>
      <div className='navLeft'>
        <div className='navLogo'>
          <Link exact to='/'>
            ARTORING
          </Link>
        </div>
        <div className='navBox'>
          <Link to='/mentor'>멘토 찾기</Link>
        </div>
        <div className='navBox'>
          <Link to='/career/teach'>커리어 교육</Link>
          <div className='navCareerSubTab'>
            <div className='NavSubTabFlex'>
              <div className='navCareerSubTabBox'>
                <Link to='/career/growing'>커리어 성장</Link>
              </div>
              <div className='navCareerSubTabBox'>
                <Link to='/career/signature'>시그니처 프로그램</Link>
              </div>
            </div>
          </div>
        </div>
        <div className='navBox'>
          <Link to='/careerInfo'>커리어 정보</Link>
        </div>
        <div className='navBox'>
          <Link to='/about'>아토링 소개</Link>
        </div>
      </div>
      <div className='navRight'>
        <div className='navBox'>
          <Link to='/search'>검색</Link>
        </div>
        <div className='navBox'>
          {props.isLogin ? (
            <Link to='/login'>로그아웃</Link>
          ) : (
            <Link to='/login'>로그인/회원가입</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
