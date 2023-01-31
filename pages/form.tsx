import React, { useState } from 'react';

// ## 귀찮은 폼 만들기의 예시!

// - 왜 react hook form 라이브러리가 편할까?
// form을 직접 생성한다면 신경써줘야 할 것들이 정말 많다.
// 유저를 기본적으로 믿지 않고 설계해야하기 때문이다.
// form이 제출중일 때 한번 더 누르거나
// 영악하다면 브라우저에서 html 설정을 수정해버린다음 조건을 해제시켜 회원가입을 한다던지...
// 이런 것들을 JS로 다 잡기에는 너무 힘들다.
// 라이브러리 react hook form이 이럴 때 도움된다!

export default function Forms() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState('');
  const [emailError, setEmailError] = useState('');

  const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUsername(value);
  };

  const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setEmail(value);
  };

  const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPassword(value);
  };

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, username, password);
    if (username === '' || email === '' || password === '') {
      setFormErrors('All fields are required!');
    }
    if (!email.includes('@')) {
      setEmailError('not goood');
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={username}
        onChange={onUsernameChange}
        type="text"
        placeholder="Username"
        required
        minLength={5}
      />
      <input
        value={email}
        onChange={onEmailChange}
        type="email"
        placeholder="Email"
        required
      />
      <input
        value={password}
        onChange={onPasswordChange}
        type="password"
        placeholder="Password"
        required
      />
      <input type={'submit'} value="Create Account" />
    </form>
  );
}
