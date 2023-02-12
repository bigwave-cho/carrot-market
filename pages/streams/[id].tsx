import Layout from '@/components/layout';
import Message from '@/components/message';
import useMutation from '@/libs/client/useMutation';
import useUser from '@/libs/client/useUser';
import { Stream as StreamType } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

interface StremaMessage {
  message: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}
interface StreamWithMessages extends StreamType {
  messages: StremaMessage[];
}

interface StreamResponse {
  ok: true;
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

const Stream: NextPage = () => {
  // 메시지 주인 구별하기 위함
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );

  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );

  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    sendMessage(form);
  };

  useEffect(() => {
    //메시지를 보냈을 때 화면에 메시지 업데이트 하는 첫 번째 방법
    //stream 페치 재요청(메시지보낼 때마다 패치를 하게 됨.)
    if (sendMessageData && sendMessageData.ok) {
      mutate();
    }
  }, [sendMessageData, mutate]);
  return (
    <Layout canGoBack>
      <div className=" space-y-4 py-10 px-4 ">
        <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="mt-3 block text-2xl text-gray-900">
            ₩{data?.stream?.price}
          </span>
          <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="h-[50vh] space-y-4 overflow-y-scroll py-10  px-4 pb-16">
            {data?.stream.messages.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id}
              />
            ))}
          </div>
          <div className="fixed inset-x-0 bottom-0  bg-white py-2">
            <form
              onSubmit={handleSubmit(onValid)}
              className="relative mx-auto flex w-full  max-w-md items-center"
            >
              <input
                {...register('message', { required: true })}
                type="text"
                className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
