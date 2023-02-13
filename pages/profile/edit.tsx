import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import useMutation from '@/libs/client/useMutation';
import useUser from '@/libs/client/useUser';
// import useUser from '@/libs/client/useUser';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    //watch는 모든 변경을 감지
    watch,
  } = useForm<EditProfileForm>();

  useEffect(() => {
    if (user?.name) setValue('name', user?.name);
    if (user?.email) setValue('email', user?.email);
    if (user?.phone) setValue('phone', user?.phone);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/eIv5P4hDW8zI1jHvbe5XNg/${user?.avatar}/public`
      );
  }, [user, setValue]);

  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (!email && !phone && !name) {
      return setError('formErrors', {
        message: 'Email or Phone number are required. Choose one!',
      });
    }
    //avatar가 form 데이터에 있고 파일 렝스가 1 이상일 때
    if (avatar && avatar.length > 0 && user) {
      // CF에 URL 요청
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      console.log(uploadURL);

      // 받은 url로 파일 업로드할 form 만들기(CF docs 참고)
      const form = new FormData();
      form.append('file', avatar[0], user?.id.toString());
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      //업로드하면 해당 파일에 접근 가능한 id를 응답줌.
      console.log(id);

      editProfile({
        email,
        phone,
        name,
        avatarId: id,
      });
    } else {
      editProfile({
        email,
        phone,
        name,
      });
    }
  };

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError('formErrors', { message: data.error });
    }
  }, [data, setError]);

  const [avatarPreview, setAvatarPreview] = useState('');
  const avatar = watch('avatar');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      //file을 url로 접근할 수 있도록 하는 메서드.
      //blob:url  모두 써줘야 해당 사진을 브라우저에서 볼 수 있다.
      //file 업로드 -> 브라우저 메모리에 저장 -> 해당 메모리 접근하는 url 생성
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 py-10 px-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="h-14 w-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Change
            <input
              {...register('avatar')}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          // 이름 변경 추가
          register={register('name')}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
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
        <Button text={loading ? 'Loading...' : 'Update profile'} />
      </form>
    </Layout>
  );
};

export default EditProfile;
