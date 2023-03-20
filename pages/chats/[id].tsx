import Layout from '@/components/layout';
import Message from '@/components/message';
import useUser from '@/libs/client/useUser';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Chatroom, User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@/libs/client/useMutation';

interface ChatMessage {
  createdAt: string;
  id: number;
  message: string;
  userId: number;
}

interface ChatroomWithUser {
  chatroom: Chatroom;
  host: User;
  guest: User;
  hostId: number;
  id: number;
  chatMessages: ChatMessage[];
}

interface ChatroomResponse {
  ok: boolean;
  chatroom: ChatroomWithUser;
}

interface MessageForm {
  message: string;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR<ChatroomResponse>(
    router.query.id ? `/api/chats/${router.query.id}` : null
  );

  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/chats/${router.query.id}/messages`
  );
  console.log(data);
  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          chatroom: {
            ...prev.chatroom,
            chatMessages: [
              ...prev.chatroom.chatMessages,
              {
                createdAt: Date.now(),
                id: Date.now(),
                message: form.message,
                userId: user?.id,
              },
            ],
          },
        } as any),
      false
    );
    sendMessage(form);
  };
  // console.log(sendMessageData);
  return (
    <Layout canGoBack title={data?.chatroom.host.name}>
      <div className="space-y-4 py-10 px-4 pb-16 ">
        {data?.chatroom?.chatMessages.map((chatMessage: any) => {
          return (
            <Message
              key={chatMessage.id}
              avatarUrl={
                chatMessage.userId === data.chatroom.hostId
                  ? data.chatroom.host.avatar ?? ''
                  : data.chatroom.guest.avatar ?? ''
              }
              message={chatMessage.message}
              reversed={user?.id === chatMessage.userId ? true : false}
            />
          );
        })}

        {/* input 창 구역 */}
        <form
          onSubmit={handleSubmit(onValid)}
          className="fixed inset-x-0 bottom-0  bg-white py-2"
        >
          <div className="relative mx-auto flex w-full  max-w-md items-center">
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
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatDetail;
