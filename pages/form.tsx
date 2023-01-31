import { FieldErrors, useForm } from 'react-hook-form';

export default function Forms() {
  const {
    setValue,
    setError,
    reset,
    resetField,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: 'onChange' });
  // mode:onblur - 인풋에서 벗어날 때 오류 표시해줌.
  // console.log(
  //   register('이름', {
  //     minLength: 2,
  //     required: true,
  //   })
  // );
  // name onBlur onChange 를 가진 객체.
  // 첫번째 인자로는 이름, 두번째 인자는 validation에 관한 것을 객체로 전달
  // console.log(watch());
  // register로 생성한 것들의 name을 key로 가지고 값으로는 value.
  //handleSubmit()은 1~2개의 함수를 전달 받음. 하나는 유효할 때, 하나는 유효X일 때

  interface LoginForm {
    username: string;
    password: string;
    email: string;
    errors?: string;
  }
  const onVaild = (data: LoginForm) => {
    console.log(data);
    //fetch 했는데 백엔드가 먹통.
    // -> setError("errors" {message: "백엔드가 먹통이오~"})

    //이미 존재하는 유저네임
    // setError("username" {message:" 이미 존재하는 이름."})
    //{errors.username?.message}

    reset(); // 폼 초기화
    resetField('password'); //특정 필드만 초기화
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  // 잡다한 기능 특정 state 벨류 바꾸기
  // setValue('username', 'hello');

  return (
    <form onSubmit={handleSubmit(onVaild, onInvalid)}>
      <input
        {...register('username', {
          required: '이름 써라',
          minLength: {
            message: '5글자 이상',
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register('email', {
          required: '메일 써라',
          validate: {
            notGmail: (value) => !value.includes('@gmail.com') || 'Gmail ㄴㄴ',
          },
        })}
        type="email"
        placeholder="Email"
        //tailwind 커스텀
        className={`${Boolean(errors.email?.message) ? 'border-red-500' : ''}`}
      />
      {errors.email?.message}
      <input
        {...register('password', {
          required: true,
        })}
        type="password"
        placeholder="Password"
      />
      <input type={'submit'} value="Create Account" />
    </form>
  );
}
