import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import OnLogin from './OnLogin';
import utils from '../Common';
import { useForm } from 'react-hook-form';

import axios from 'axios';

const { classReplacer } = utils;

function Header ({ isLogin, profile, searchDataHandler, isSearching, searchingToggler }) {
  const history = useHistory();
  const [isCareerToggled, setCareerToggle] = useState(false);
  const [isCareerClicked, setCareerClick] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const handleSearch = (data) => {
    searchDataHandler(data.search);

    history.push(`/search?keyword=${data.search}`);
  };

  // 로그인 이후 검색 이미지가 보이지 않는 문제를 해결하기 위한 훅.
  useEffect(() => {
    const t = document.querySelector('.SearchIcon');
    t.src = process.env.PUBLIC_URL + '/img/search.svg';
    console.log(history);
  });

  return (!isSearching
    ? <div className='nav'>
      <div className='navLeft TextType2'>
        <div className='navLogo'>
          <Link exact to='/' onClick={() => setCareerClick(false)}>
            ARTORING
          </Link>
        </div>
        <div className='navBox'>
          <Link
            to='/mentor'
            onClick={() => setCareerClick(false)}
          >멘토 찾기
          </Link>
          <div className='OnMouseUP' />
        </div>

        <div
          className={!isCareerToggled && !isCareerClicked ? 'navBox' : 'navBoxActive'} onMouseLeave={() => { setCareerToggle(false); }}
          onMouseEnter={() => setCareerToggle(true)}
        >
          <Link
            to='/career/growing'
            onClick={() => setCareerClick(true)}
          >커리어 교육
          </Link>
          <div className='OnMouseUP' />
          <div
            className={!isCareerToggled && !isCareerClicked ? 'navCareerSubTab AlignCenter' : 'navCareerSubTabActive Flex AlignCenter'}
          >
            <div className='NavSubTabFlex'>
              <div className='navCareerSubTabBox'>
                <Link to='/career/growing' onClick={() => setCareerClick(true)}>커리어 성장</Link>
              </div>
              <div className='navCareerSubTabBox'>
                <Link to='/career/signature' onClick={() => setCareerClick(true)}>시그니처 프로그램</Link>
              </div>
            </div>
          </div>
        </div>
        <div className='navBox'>
          <Link to='/career/info' onClick={() => setCareerClick(false)}>커리어 정보</Link>
          <div className='OnMouseUP' />
        </div>
        <div className='navBox'>
          <Link to='/about' onClick={() => setCareerClick(false)}>아토링 소개</Link>
          <div className='OnMouseUP' />
        </div>
      </div>
      <div className='navRight TextType2 AlignCenter Flex'>
        <div className='navBox'>
          <img
            src={process.env.PUBLIC_URL + '/img/search.svg'}
            alt='검색'
            className='SearchIcon'
            onMouseUp={() => classReplacer('.SearchIcon', 'SearchIcon ClickOrMouseUp')}
            onMouseDown={() => classReplacer('.SearchIcon', 'SearchIcon')}
            onClick={() => {
              searchingToggler(true);
              setCareerClick(false);
            }}
          />
        </div>
        <div className='navBox' onClick={() => setCareerClick(false)}>
          {isLogin
            ? <OnLogin isLogin={isLogin} profile={profile} />
            : <Link
                to='/login' className='isLogin'
                onMouseOver={() => classReplacer('.isLogin', 'isLogin ClickOrMouseUp')}
                onMouseLeave={() => classReplacer('.isLogin', 'isLogin')}
              >로그인/회원가입
            </Link>}

        </div>
      </div>
    </div>
    : <div className='nav Flex' onClick={() => setCareerClick(false)}>
      <img src={process.env.PUBLIC_URL + '/img/search.svg'} className='SearchIcon' alt='검색' />
      <form onSubmit={handleSubmit(handleSearch)} className='SearchForm'>
        <input type='text' {...register('search')} placeholder='검색어를 입력해 주세요. ' className='SearchPlaceHolder TextType2' />
      </form>
      <div className='CloseSearch' onClick={() => searchingToggler(false)}>&times;</div>
      </div>
  );
}

export default Header;
