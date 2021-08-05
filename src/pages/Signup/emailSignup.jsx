import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import '../../css/signUp/EmailSignup.css';

const EmailSignup = (props) => {
  const history = useHistory();
  const [isCompleted, completedHandler] = useState(false);
  const [mailData, mailDataAdaptor] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    // axios로 서버에 저장 요청을 보내고 리디렉션
    // 위로 프롭스 올렸구나!!!!!!

    const url = process.env.REACT_APP_NODE_ENV === 'development'
      ? 'https://localhost:4000/signup'
      : 'https://back.artoring.com/signup';

    try {
      const { data: response } = await axios.post(url, data);
      mailDataAdaptor(response);
      completedHandler(true);
    } catch (e) {
      const errors = e.toString();
      if (errors.includes(409)) {
        window.alert('기존에 가입한 이메일 입니다.');
        history.push('/');
      } else if (errors.includes(400)) {
        window.alert('잘못된 접근입니다.');
        history.push('/');
      } else {
        window.alert('서버에서 문제가 발생했습니다. 고객센터로 문의 바랍니다.');
      }
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

  return (
    !isCompleted ? <div className='SignupContainer Flex JustifyCenter'>
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
                  value: emailRegex
                }
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
                  value: birthRegex
                }
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
                pattern: passwordRegex
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
                validate: (str) => str === watch('password')
              })}
            />
            {errors.passwordCheck && (
              <span role='alert' className='AlertMsg'>
                입력된 비밀번호와 일치하지 않습니다.
              </span>
            )}
          </label>

          <div className='TOSContainer'>
            <label htmlFor='agreeToTermsOfUse'>
              <div className='TOSFontSize'>
                <input
                  type='checkbox'
                  {...register('이용약관동의')}
                  id='agreeToTermsOfUse'
                />
                <span className='TOSMargin'>아토링 이용 약관 동의</span>
                <button className='TOSBtnType TOSFontSize'>내용보기</button>
              </div>
            </label>
            <label htmlFor='agreeToPersonalInfo'>
              <div className='TOSFontSize'>
                <input
                  type='checkbox'
                  {...register('개인정보수집이용동의')}
                  id='agreeToPersonalInfo'
                />
                <span className='TOSMargin'>개인정보 수집, 이용 동의</span>
                <button className='TOSBtnType TOSFontSize'>내용보기</button>
              </div>
            </label>
            <label htmlFor='agreeToAdult'>
              <div className='TOSFontSize'>
                <input
                  type='checkbox'
                  {...register('14세이상동의')}
                  id='agreeToAdult'
                />
                <span className='TOSMargin'>만 14세 이상입니다.</span>
              </div>
            </label>
            <label>
              <div className='PlaceHolderBtnContainer'>
                <button className='PlaceHolderBtn BtnType1'>가입하기</button>
              </div>
            </label>
          </div>
        </form>
      </div>
                   </div>
      : <div className='BasicFinisherContainer Flex-Col JustifyCenter AlignCenter'>
        <div className='Title3'>회원 가입이 완료되었어요!</div>
        <div className='body1'>하지만 작성해주신 이메일 검증이 완료되어야만</div>
        <div className='body1'>모든 서비스를 원할하게 이용하실 수 있답니다!</div>

        <div className='body1'>지금 바로 등록하신 메일 {mailData.accepted[0]} 을 확인해 보세요!</div>
        <div className='Title4'>10분간 유효한 메일이 기다리고 있답니다!</div>
        </div>
  );
};

export default EmailSignup;
