import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { message },
    query: { id },
    session: { user },
  } = req;
  const chatMessages = await client.chatMessage.create({
    data: {
      message: message,
      chatroom: {
        connect: {
          id: Number(id),
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    chatMessages,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
