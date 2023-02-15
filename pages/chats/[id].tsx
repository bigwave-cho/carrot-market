import Layout from '@/components/layout';
import Message from '@/components/message';
import useUser from '@/libs/client/useUser';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
// tailwind의 space-x-reverse를 이용해서
// 대화 풍선을 반대로 적용해보았다.

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useSWR(
    router.query.id ? `/api/chats/${router.query.id}` : null
  );
  const { user } = useUser();
  return (
    <Layout canGoBack title="재용 리">
      <div className="space-y-4 py-10 px-4 pb-16 ">
        {data?.chatroom?.chatMessages.map((chatMessage: any) => {
          console.log(chatMessage);
          return (
            <Message
              key={chatMessage.id}
              avatarUrl={
                chatMessage.userId === data.chatroom.hostId
                  ? data.chatroom.host.avatar
                  : data.chatroom.guest.avatar
              }
              message={chatMessage.message}
              reversed={user?.id === chatMessage.userId ? true : false}
            />
          );
        })}

        {/* input 창 구역 */}
        <form className="fixed inset-x-0 bottom-0  bg-white py-2">
          <div className="relative mx-auto flex w-full  max-w-md items-center">
            <input
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
