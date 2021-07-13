import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../css/Personal/Account.css';

const Account = (props) => {
  const [image, imageHandler] = useState(null);
  const [isChangePwd, isChangePwdHandler] = useState(true);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = data => {
    console.log(data);
    // axios로 서버에 저장 요청을 보내고 리디렉션
    props.profileHandler({ ...props.profile, ...data });
  };

  return (
    <div className='AccountContainer'>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <div className='PlaceHolder '>
            <div className='FormTitle SpaceAround'>프로필 사진</div>
            <div className='Flex'>
              {image ? <img src='' alt='thumbnail' /> : <div className='BlankThumb' />}
              <div className='FormTitle ThumbDesc'>해당영역을 클릭하여 이미지 업로드를 할수 있습니다. <br /> png, jpeg, jpg 파일만 업로드 가능합니다.
              </div>
              <label htmlFor='UploadPhoto' />
              <input
                type='file' accept='image/jpg,image/png,image/jpeg'
                name='picture' id='UploadPhoto' {...register('thumb')}
              />
            </div>
          </div>
        </label>
        <label>
          <div className='FormTitle'>이름*</div>
          <div className='PlaceHolder'>test</div>
        </label>
        <label>
          <div className='FormTitle'>이메일*</div>
          <div className='PlaceHolder'>foo@bar.com</div>
        </label>
        <label>
          <div className='FormTitle'>성별*</div>
          <div className='Flex Gender'>
            <input type='radio' name='gender' id='male' value='male' className='AlignCenter' {...register('gender', { required: true })} />
            <label htmlFor='male' className='GenderSelect'>남성</label>

            <input type='radio' name='gender' id='female' value='female' className='AlignCenter' {...register('gender', { required: true })} />
            <label htmlFor='female' className='GenderSelect'>여성</label>

            <input type='radio' name='gender' id='hidden' value='hidden' className='AlignCenter' {...register('gender', { required: true })} />
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
          <div className='PlaceHolder'>test</div>
        </label>
        <label>
          <div className='FormTitle'>휴대전화번호*</div>
          <div className='PlaceHolder'>test</div>
        </label>
        <label>
          <div className='FormTitle'>주소*</div>
          <div className='PlaceHolder'>test</div>
        </label>
        {isChangePwd
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
            <button className='PlaceHolderBtn'>변경사항 저장</button>
          </div>
        </label>
      </form>
    </div>
  );
};

export default Account
;
