import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import useUser from '@/libs/client/useUser';
// import useUser from '@/libs/client/useUser';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

interface EditProfileForm {
  email?: string;
  phone?: string;
  formErrors?: string;
}

const EditProfile: NextPage = () => {
  // useUser는 user의 로그인 여부를 확인하는 안전장치이기 때문에
  // 모든 페이지(enter 제외)에 꼭 필요!
  // _app에 추가해서 리팩토링할 수 있을듯.
  const { user } = useUser();

  //setValue : 값 설정 함수
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    //onValid함수의 setError에서 정한 에러
    formState: { errors },
  } = useForm<EditProfileForm>();
  useEffect(() => {
    //name이 email인 input에 두번째 인자 값 설정.
    if (user?.email) {
      setValue('email', user?.email);
    }
    if (user?.phone) {
      setValue('phone', user?.phone);
    }
  }, [user, setValue]);

  const onValid = ({ email, phone }: EditProfileForm) => {
    //두 요소가 다 비었을 경우 에러 발생시키기
    if (!email && !phone) {
      setError('formErrors', {
        message: 'Email or Phone number are required. Choose one!',
      });
    }
  };

  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 py-10 px-4">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register('email')}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register('phone')}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 block font-bold text-red-500">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text="Update profile" />
      </form>
    </Layout>
  );
};

export default EditProfile;
