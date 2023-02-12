import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import TextArea from '@/components/textarea';
import useMutation from '@/libs/client/useMutation';
import { Stream } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface CreateForm {
  name: string;
  price: string;
  description: string;
}

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const { register, handleSubmit } = useForm<CreateForm>();
  const [createStream, { loading, data }] =
    useMutation<CreateResponse>(`/api/streams`);
  const router = useRouter();

  const onValid = (form: CreateForm) => {
    if (loading) return;
    createStream(form);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Go Live">
      <form onSubmit={handleSubmit(onValid)} className="space-y-5 px-4 py-10">
        <Input
          register={register('name', { required: true })}
          name="name"
          label="Name"
          type="text"
          required
        />
        <Input
          //valueAsNumber : 입력값을 숫자로 반환하는 옵션!
          register={register('price', { required: true, valueAsNumber: true })}
          name="price"
          label="Price"
          kind="price"
          type="text"
          required
        />
        <TextArea
          register={register('description', { required: true })}
          label="Description"
          name="description"
        />
        <Button text={loading ? 'Loading...' : 'Go Live'}></Button>
      </form>
    </Layout>
  );
};

export default Create;
