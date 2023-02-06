import Button from '@/components/button';
import Layout from '@/components/layout';
import TextArea from '@/components/textarea';
import useMutation from '@/libs/client/useMutation';
import { Post } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useCoords from '@/libs/client/useCoords';

interface WriteFrom {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  // hook만들 때는 반환값이 무엇일지 생각하고 만드는 것을 지향
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteFrom>();
  const [post, { loading, data }] = useMutation<WriteResponse>('/api/posts');
  const onValid = (data: WriteFrom) => {
    if (loading) return;
    // data에 위경도 추가!
    post({ ...data, latitude, longitude });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data?.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10">
        <TextArea
          register={register('question', {
            required: true,
            minLength: 5,
          })}
          required
          placeholder="Ask a question!"
        ></TextArea>
        <Button text={loading ? 'Loading...' : 'Submit'} />
      </form>
    </Layout>
  );
};

export default Write;
