import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import utils from '../Common';
import '../../css/Personal/Account.css';

const { classReplacer } = utils;

const Account = ({ profileHandler, onClickHandler, profile, isSignup, accessToken, loginType }) => {
  const [image, imageHandler] = useState(profile ? profile.thumb : '');
  const [isChangePwd, isChangePwdHandler] = useState(true);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  useEffect(() => {
    async function asyncFetch () {
      if (!profile) {
        const url = process.env.NODE_ENV === 'development' ? `https://localhost:4000/profile?type=${loginType}&id=${profile._id}` : `https://insideart-dev.artoring.com/profile?type=${loginType}&id=${profile._id}`;
        const { data } = await axios.get(url, { headers: { authorization: `Bearer ${accessToken}` } });
        profileHandler(data);
      }
    }
    asyncFetch();
  }, []);

  const onSubmit = data => {
    console.log(errors);
    // axios로 서버에 저장 요청을 보내고 리디렉션
    profileHandler({ ...profile, thumb: image, ...data });
    onClickHandler();
  };

  // 이미지 업로드용
  const imageUploader = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    const url = process.env.REACT_APP_NODE_ENV === 'development'
      ? 'https://localhost:4000/upload/img'
      : 'https://back.artoring.com/upload/img';

    const { data } = await axios.post(url, formData);

    // 전달받은 데이터는 URL 주소 및 도메인과 프로토콜의 정보가없는 path만 존재하는 key 데이터가 존재.
    // 해당 key를 이용하여 클라우트 프론트 주소(artoring.com)으로 접근한다. S3 주소는 직접 접근이 제한되어 있다.
    // ! 버그!!!!
    // ! 서버에 해당 유저데이터가 존재하면 화면에 해당 유저의 데이터들이 렌더링 된다.
    // ! 하지만 react-hook-form은 아무런 입력이 없으면 validation이 실패한다.
    const imgUrl = 'https://artoring.com/'.concat(data.key);
    imageHandler(imgUrl);
  };

  return (
    <div className='AccountContainer'>
      {profile
        ? <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <div className='PlaceHolder '>
              <div className='FormTitle SpaceAround'>프로필 사진</div>
              <div className='Flex'>
                {image ? <img src={image} alt='thumbnail' className='Thumb' /> : <div className='BlankThumb' />}
                <div className='FormTitle ThumbDesc'>해당영역을 클릭하여 이미지 업로드를 할수 있습니다. <br /> png, jpeg, jpg 파일만 업로드 가능합니다.
                </div>
                <label htmlFor='UploadPhoto' />
                <input
                  type='file' accept='image/jpg,image/png,image/jpeg'
                  name='picture' id='UploadPhoto'
                  onChange={imageUploader}
                />
              </div>
            </div>
          </label>
          <label>
            <div className='FormTitle'>이름*</div>
            {isSignup && !profile.name
              ? <input type='text' id='name' className='PlaceHolder' {...register('name', { required: true })} />
              : <div className='PlaceHolder'>{profile.name}</div>}
          </label>
          <label>
            <div className='FormTitle'>이메일*</div>
            {isSignup && !profile.email
              ? <input type='text' id='email' className='PlaceHolder' {...register('email', { required: true })} />
              : <div className='PlaceHolder'>{profile.email}</div>}
          </label>
          <label>
            <div className='FormTitle'>성별*</div>
            <div className='Flex Gender'>
              <input type='radio' name='gender' id='male' value='male' className='AlignCenter' {...register('gender', { required: true })} checked={profile.gender === 'male' ? 'true' : ''} />
              <label htmlFor='male' className='GenderSelect'>남성</label>

              <input type='radio' name='gender' id='female' value='female' className='AlignCenter' {...register('gender', { required: true })} checked={profile.gender === 'female' ? 'true' : ''} />
              <label htmlFor='female' className='GenderSelect'>여성</label>

              <input type='radio' name='gender' id='hidden' value='hidden' className='AlignCenter' {...register('gender', { required: true })} checked={profile.gender === 'hidden' ? 'true' : ''} />
              <label htmlFor='male' className='GenderSelect'>비공개</label>
            </div>
            {errors.gender && (
              <span role='alert' className='AlertMsg'>
                반드시 하나를 선택해 주세요.
              </span>
            )}
          </label>
          <label>
            <div className='FormTitle'>생년원일*</div>
            {isSignup && !profile.birth
              ? <input type='text' id='birth' className='PlaceHolder' {...register('birth', { required: true })} />
              : <div className='PlaceHolder'>{profile.birth}</div>}
          </label>
          <label>
            <div className='FormTitle'>휴대전화번호*</div>
            {isSignup && !profile.phone
              ? <input type='text' id='phone' className='PlaceHolder' {...register('phone', { required: true })} />
              : <div className='PlaceHolder'>{profile.phone}</div>}
          </label>
          {isSignup ? '' : isChangePwd
            ? <label>
              <div className='FormTitle'>비밀번호*</div>
              <div className='PlaceHolder' onClick={() => isChangePwdHandler()}>비밀번호 변경하기</div>
            </label>
            : (
              <div>
                <label>
                  <div className='FormTitle'>비밀번호*</div>
                  <span className='FormTitle'>새로운 비밀번호</span><span>(8자 이상 입력해 주세요)</span>
                  <input type='password' className='PlaceHolder' {...register('password', { pattern: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[!@%*#^&])(?!.*[^a-zA-z0-9!@%*#^&]).{8,16}$/ })} />

                </label>
                {
              errors.password && (
                <span role='alert' className='AlertMsg'>
                  비밀번호에는 최소 한개의 대문자, 숫자 및 특수문자(!,@, #,%,^,&,*)가 필요합니다!
                </span>
              )
            }
                <label>
                  <div className='FormTitle'>새로운 비밀번호 확인</div>
                  <input
                    type='password' className='PlaceHolder' {...register('password', {
                      validate: (str) => str === watch('password')
                    })}
                  />
                  {
              errors.password && (
                <span role='alert' className='AlertMsg'>
                  입력된 비밀번호와 일치하지 않습니다!
                </span>
              )
            }
                </label>
              </div>
              )}
          <label>
            <div className='PlaceHolderBtnContainer'>
              <button
                className='PlaceHolderBtn BtnType5'
                onMouseOver={(e) => classReplacer('.PlaceHolderBtn', 'PlaceHolderBtn BtnType5 Btn5Active')}
                onMouseLeave={(e) => classReplacer('.PlaceHolderBtn', 'PlaceHolderBtn BtnType5')}
              >변경사항 저장
              </button>
            </div>
          </label>
        </form>
        : <div>불러오는중.....</div>}
    </div>
  );
};

export default Account
;
