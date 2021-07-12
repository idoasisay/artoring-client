import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../css/Personal/Profile.css';
import InterestedList from './interesting';
import TextareaAutosize from 'react-textarea-autosize';

const Profile = (props) => {
  const [list, listHandler] = useState([
    { name: '창업', val: false },
    { name: '취업', val: false },
    { name: '전문예술', val: false },
    { name: '프리랜서', val: false },
    { name: '대학원/유학', val: false },
    { name: '예술교육', val: false },
    { name: '연구개발', val: false },
    { name: '기획/창작/제작', val: false },
    { name: '크리에이터', val: false },
    { name: '홍보마케팅', val: false },
    { name: '경영지원(인사 및 회계)', val: false },
    { name: '구분 외 관심사 or 기타', val: false }
  ]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
    console.log(list);
    // axios로 서버에 저장 요청을 보내고 리디렉션
  };

  return (
    <div className='ProfileContainer'>
      <div className='ProfileTitle'>멘토링 신청 시 멘토가 참고할 수 있도록 프로필을 작성해 주세요!</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <div className='FormTitle'>전공*</div>
          <input className='PlaceHolder' id='major' {...register('major', { required: true })} />
          {errors.major && (
            <span role='alert' className='AlertMsg'>
              '없음' 혹은 전공 정보를 반드시 작성해 주세요.
            </span>
          )}
        </label>
        <label>
          <div className='FormTitle'>소속*</div>
          <input type='text' className='PlaceHolder' {...register('belongs', { required: true })} />
          {errors.belongs && (
            <span role='alert' className='AlertMsg'>
              '없음' 혹은 소속 회사의 이름을 반드시 작성해 주세요.
            </span>
          )}
        </label>
        <label>
          <div className='FormTitle'>부서</div>
          <input type='text' className='PlaceHolder' {...register('department')} />
        </label>
        <label>
          <div className='FormTitle'>직급</div>
          <input type='text' className='PlaceHolder' {...register('jobTitle')} />
        </label>
        <label>
          <div className='FormTitle'>총 근무 경력</div>
          <input type='textarea' className='PlaceHolder' {...register('howlong')} />

        </label>
        <label htmlFor='textarea'>
          <div className='FormTitle'>주요 경력</div>
          <TextareaAutosize
            className='PlaceHolder' minRows='5' placeholder='예시) 2010. 3. ~. 2013. 4. OO오케스트라 공연기획팀 &#10;2013. 5. ~. 2017. 8. OO문화재단 공연사업부&#10;' {...register('workHistory')}
          />
        </label>
        <label htmlFor='textarea'>
          <div className='FormTitle'>주요 활동</div>
          <TextareaAutosize
            className='PlaceHolder' minRows='5' placeholder='예시) 2018. 12. 문화체육관광부 표창장 수상 &#10;문화봉사시간 누적 340시간 &#10;사이드 프로젝트 OOO 운영' {...register('outdoor')}
          />
        </label>
        <label>
          <div className='FormTitle'>닉네임</div>
          <textarea className='PlaceHolder' type='text' {...register('nickName')} />
        </label>
        <label>
          <div className='FormTitle'>관심사를 선택해주세요. (중복 선택 가능)</div>
          <InterestedList list={list} listHandler={listHandler} />
        </label>
        <label>
          <div className='PlaceHolderBtnContainer'>
            <button className='PlaceHolderBtn'>변경사항 저장</button>
          </div>
        </label>
      </form>
    </div>
  );
}
;

export default Profile;
