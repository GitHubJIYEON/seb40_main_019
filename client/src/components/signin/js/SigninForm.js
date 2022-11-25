import { useState } from 'react';
import '../css/signinForm.scss';
import FormInput from '../../sign/js/FormInput';
import FormButtonYellow from '../../sign/js/FormButtonYellow';
import FormButtonBlue from '../../sign/js/FormButtonBlue';
import kakaoIcon from '../../../assets/img/kakaoIcon.png';
import googleIcon from '../../../assets/img/googleIcon.png';
import { Link } from 'react-router-dom';
import { kakaoLogin } from '../../../util/api/oauthKakao';
import { googleLogin } from '../../../util/api/oauthGoogle';
import {
  submitForm,
  guestLogin,
  sellerLogin,
} from '../../../util/api/loginForm';
// eslint-disable-next-line no-useless-escape
let emailExptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

export default function SigninForm() {
  const [data, setDate] = useState({
    email: '',
    password: '',
  });

  const formSubmit = (e) => {
    e.preventDefault();

    if (!data.email) {
      window.alert('이메일을 입력하세요.');
      return;
    }
    if (!emailExptext.test(data.email)) {
      window.alert('유효하지 않은 형식의 이메일 주소입니다.');
      return;
    }

    if (!data.password) {
      window.alert('비밀번호를 입력하세요');
      return;
    }
    submitForm({
      email: data.email,
      password: data.password,
    });
  };

  const onChangeInput = (e) => {
    setDate({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="signinTitle">
        <h1>Log in</h1>
      </div>
      <form
        className="signinForm"
        action="#"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormInput
          labelName="Email"
          inputId="email"
          inputType="email"
          name="email"
          onChangeInput={onChangeInput}
          placeholder="Please enter your Email"
        />
        <FormInput
          labelName="Password"
          inputId="password"
          inputType="password"
          name="password"
          onChangeInput={onChangeInput}
          placeholder="Please enter your password"
        />
        <FormButtonYellow formSubmit={formSubmit} btnContent="Log in" />
        <div className="signupLink">
          Don’t have an account?
          <Link to={'/signup'}>Sign in</Link>
        </div>
        <div className="flexBox">
          <a href={kakaoLogin}>
            <img src={kakaoIcon} alt="kakaoAuth" />
          </a>
          <a href={googleLogin}>
            <img src={googleIcon} alt="googleAuth" />
          </a>
        </div>
        <FormButtonBlue btnContent="Guest User" formSubmit={guestLogin} />
        <FormButtonBlue btnContent="Guest Seller" formSubmit={sellerLogin} />
      </form>
    </>
  );
}
