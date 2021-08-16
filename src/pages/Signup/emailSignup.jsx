import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import '../../css/signUp/EmailSignup.css';
import TOUmodal from './TOUmodal';

const EmailSignup = ({ tokenHandler, loginHandler, typeHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    const { email, name, gender, birth, phone, password } = data;
    // axios로 서버에 저장 요청을 보내고 리디렉션
    // 위로 프롭스 올렸구나!!!!!!
    const url =
      process.env.REACT_APP_NODE_ENV === 'development'
        ? 'https://localhost:4000/signup'
        : 'https://back.artoring.com/signup';

    try {
      const { data: axiosResult } = await axios.post(url, {
        email,
        name,
        gender,
        birth,
        phone,
        password,
      });

      const { response, accessToken } = axiosResult;

      tokenHandler(accessToken);
      loginHandler(true);
      typeHandler('email');
      history.push('/after/signup');
    } catch (e) {
      console.log(e);

      window.alert('서버 전송에 실패했습니다. 잠시후 시도해 주세요');
    }
  };
  // ex: first@naver.com
  const emailRegex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  // ex: Abcderrrood!
  const passwordRegex = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
  // ex: 19990422
  const birthRegex = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

  const errorMessageTag = (message) => {
    return (
      <span role='alert' className='AlertMsg'>
        {message}
      </span>
    );
  };

  // modal
  const [isCheckedToTOUModalOn, setIsCheckedToTOUModalOn] = useState(false);
  const [isCheckedToPIModalOn, setIsCheckedToPIModalOn] = useState(false);

  const handleCheckedToTOUOpen = (e) => {
    setIsCheckedToTOUModalOn(true);
  };

  const handleCheckedToTOUClose = (e) => {
    setIsCheckedToTOUModalOn(false);
  };

  const handleCheckedToPIOpen = (e) => {
    setIsCheckedToPIModalOn(true);
  };

  const handleCheckedToPIClose = (e) => {
    setIsCheckedToPIModalOn(false);
  };

  return (
    <div className='SignupContainer Flex JustifyCenter'>
      <div className='LimitWidth'>
        <div className='Title3 AlignLeft SignUpHead'>이메일로 가입하기</div>
        <form onSubmit={handleSubmit(onSubmit)} className='LimitWidth'>
          {/* 이름 */}
          <label htmlFor='name'>
            <div className='FormTitle'>이름</div>
            <input
              type='text'
              className='PlaceHolder LimitWidth FormMargin'
              id='name'
              name='name'
              {...register('name', { required: true, maxLength: 20 })}
            />
            {errors.name && errorMessageTag('이름을 입력해 주세요.')}
          </label>
          {/* 이메일 */}
          <label htmlFor='email'>
            <div className='FormTitle'>이메일</div>
            <input
              type='email'
              className='PlaceHolder LimitWidth FormMargin'
              placeholder='예) artoring@gmail.com'
              id='email'
              name='email'
              {...register('email', {
                required: true,
                pattern: {
                  value: emailRegex,
                },
              })}
            />
            {errors.email?.type === 'required' &&
              errorMessageTag('이메일을 입력해 주세요.')}
            {/* {errors.email && errorMessageTag(이메일 유효성이 맞지 않음)} */}
          </label>
          {/* 성별 */}
          <label htmlFor='gender'>
            <div className='FormTitle'>성별</div>
            <div className='Flex Gender PlaceHolder LimitWidth FormMargin'>
              <label htmlFor='male' className='GenderSelect'>
                <input
                  type='radio'
                  name='gender'
                  id='male'
                  value='male'
                  className='AlignCenter RadioStyle'
                  {...register('gender', { required: true })}
                />
                <span>남성</span>
              </label>
              <label htmlFor='female' className='GenderSelect'>
                <input
                  type='radio'
                  name='gender'
                  id='female'
                  value='female'
                  className='AlignCenter'
                  {...register('gender', { required: true })}
                />
                <span>여성</span>
              </label>
              <label htmlFor='hidden' className='GenderSelect'>
                <input
                  type='radio'
                  name='gender'
                  id='hidden'
                  value='hidden'
                  className='AlignCenter'
                  {...register('gender', { required: true })}
                />
                <span>비공개</span>
              </label>
            </div>
            {errors.gender && errorMessageTag('반드시 하나를 선택해 주세요.')}
          </label>
          {/* 생년월일 */}
          <label htmlFor='birth'>
            <div className='FormTitle'>생년월일</div>
            <input
              type='datetime'
              className='PlaceHolder LimitWidth FormMargin'
              placeholder='예) YYYYMMDD'
              id='birth'
              name='birth'
              {...register('birth', {
                required: true,
                pattern: {
                  value: birthRegex,
                },
              })}
            />
            {errors.birth && errorMessageTag('생년월일을 작성해 주세요.')}
          </label>
          {/* 휴대전화번호 */}
          <label htmlFor='phone'>
            <div className='FormTitle'>휴대전화번호</div>
            <input
              type='tel'
              id='phone'
              className='PlaceHolder LimitWidth FormMargin'
              name='phone'
              placeholder='예) 01012345678'
              {...register('phone', { required: true, maxLength: 12 })}
            />
            {errors.phone && errorMessageTag('전화번호를 적어 주세요.')}
          </label>
          {/* 주소 */}
          <label htmlFor='adress'>
            <div className='FormTitle'>주소</div>
            <input
              type='adress'
              className='PlaceHolder LimitWidth FormMargin'
              id='adress'
              name='adress'
              {...register('adress', { required: true })}
            />
            {errors.adress && errorMessageTag('주소를 적어 주세요.')}
          </label>
          {/* 비밀번호 */}
          <label htmlFor='password'>
            <div className='FormTitle'>
              비밀번호
              <div className='PasswordColor'>(8자 이상 입력해 주세요)</div>
            </div>
            <input
              type='password'
              className='PlaceHolder LimitWidth FormMargin'
              {...register('password', {
                required: true,
                pattern: passwordRegex,
              })}
            />
            {errors.password && (
              <span role='alert' className='AlertMsg'>
                비밀번호에는 최소 한개의 대문자, 숫자 및
                특수문자(!,@,\#,%,^,&,)가 필요합니다.
              </span>
            )}
          </label>
          <label htmlFor='passwordCheck'>
            <div className='FormTitle'>비밀번호 확인</div>
            <input
              type='password'
              className='PlaceHolder LimitWidth FormMargin'
              {...register('passwordCheck', {
                required: true,
                validate: (str) => str === watch('password'),
              })}
            />
            {errors.passwordCheck && (
              <span role='alert' className='AlertMsg'>
                입력된 비밀번호와 일치하지 않습니다.
              </span>
            )}
          </label>

          {/* 개인정보 확인 */}
          <div className='TOSContainer'>
            <label htmlFor='agreeToTermsOfUse'>
              <div className='TOSFontSize'>
                <input
                  type='checkbox'
                  {...register('이용약관동의', { required: true })}
                  id='agreeToTermsOfUse'
                  name='agreeToTermsOfUse'
                />
                <span className='TOSMargin'>아토링 이용 약관 동의</span>
                <button
                  type='button'
                  className='TOSBtnType TOSFontSize'
                  onClick={handleCheckedToTOUOpen}
                >
                  내용보기
                </button>
              </div>
              <TOUmodal
                open={isCheckedToTOUModalOn}
                close={handleCheckedToTOUClose}
                header='아토링 이용 약관 동의'
              >
                아토링 이용 약관 동의
              </TOUmodal>
            </label>
            <label htmlFor='agreeToPersonalInfo'>
              <div className='TOSFontSize'>
                <input
                  type='checkbox'
                  {...register('개인정보수집이용동의', { required: true })}
                  id='agreeToPersonalInfo'
                />
                {errors.agreeToPersonalInfo &&
                  errorMessageTag('해당 항목에 동의해 주세요.')}
                <span className='TOSMargin'>개인정보 수집, 이용 동의</span>
                <button
                  type='button'
                  className='TOSBtnType TOSFontSize'
                  onClick={handleCheckedToPIOpen}
                >
                  내용보기
                </button>
              </div>
              <TOUmodal
                open={isCheckedToPIModalOn}
                close={handleCheckedToPIClose}
                header='개인정보 수집, 이용 동의'
              >
                개인정보 수집, 이용 동의
              </TOUmodal>
            </label>
            <label htmlFor='agreeToAdult'>
              <div className='TOSFontSize'>
                <input
                  type='checkbox'
                  {...register('14세이상동의', { required: true })}
                  id='agreeToAdult'
                />
                <span className='TOSMargin'>만 14세 이상입니다.</span>
              </div>
            </label>
          </div>
          <label>
            <div className='PlaceHolderBtnContainer'>
              <button type='submit' className='PlaceHolderBtn BtnType1'>
                가입하기
              </button>
            </div>
          </label>
        </form>
      </div>
    </div>
  );
};

export default EmailSignup;
