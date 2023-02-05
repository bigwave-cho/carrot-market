import Button from '@/components/button';
import Layout from '@/components/layout';
import TextArea from '@/components/textarea';
import useMutation from '@/libs/client/useMutation';
import { Post } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface WriteFrom {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  // Prisma제공 모델 타입 임포트!
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteFrom>();
  const [post, { loading, data }] = useMutation<WriteResponse>('/api/posts');
  const onValid = (data: WriteFrom) => {
    // submit버튼 중복 클릭 방지.
    if (loading) return;
    post(data);
  };

  useEffect(() => {
    // submit하면 등록된 post의 id 받기.
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
