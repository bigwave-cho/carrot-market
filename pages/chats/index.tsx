import Layout from '@/components/layout';
import useUser from '@/libs/client/useUser';
import { ChatMessage, Chatroom, User } from '@prisma/client';
import type { NextPage } from 'next';
import Link from 'next/link';
import useSWR from 'swr';

interface ChatroomsWithUser {
  chatroom: Chatroom;
  host: User;
  guest: User;
  id: number;
  chatMessages: ChatMessage[];
}

interface ChatroomsResponse {
  ok: boolean;
  chatrooms: ChatroomsWithUser[];
}

const Chats: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<ChatroomsResponse>(`/api/chats`);
  // console.log(data);
  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y-[1.5px]">
        {data?.chatrooms.map((chatroom) => {
          console.log(chatroom.chatMessages[0].message);
          const chatWith =
            user?.id === chatroom?.host.id
              ? {
                  id: chatroom?.guest.id,
                  name: chatroom?.guest.name,
                  avatar: chatroom?.guest.avatar,
                }
              : {
                  id: chatroom?.host.id,
                  name: chatroom?.host.name,
                  avatar: chatroom?.host.avatar,
                };
          return (
            <Link
              className="block"
              key={chatroom?.id}
              href={`/chats/${chatroom?.id}`}
            >
              <div className="flex cursor-pointer items-center space-x-3 px-4 py-3">
                <div className="h-12 w-12 rounded-full bg-slate-300" />
                <div>
                  <p className=" text-gray-700">{chatWith.name}</p>
                  <p className="text-sm text-gray-500">
                    {chatroom.chatMessages[0].message ?? '메시지가 없어요 :('}{' '}
                    &rarr;
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};
export default Chats;
