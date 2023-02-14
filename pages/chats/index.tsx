import Layout from '@/components/layout';
import useUser from '@/libs/client/useUser';
import { Chatroom, User } from '@prisma/client';
import type { NextPage } from 'next';
import Link from 'next/link';
import useSWR from 'swr';

interface ChatroomWithUser {
  chatroom: Chatroom;
  host: User;
  guest: User;
  id: number;
}

interface ChatroomResponse {
  ok: boolean;
  chatrooms: ChatroomWithUser[];
}

const Chats: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<ChatroomResponse>(`/api/chats`);
  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y-[1.5px]">
        {data?.chatrooms.map((chatroom) => {
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
                    내일 봐요 2시에! &rarr;
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
