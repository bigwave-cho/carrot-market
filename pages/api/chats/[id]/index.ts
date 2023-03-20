import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req;
  if (req.method === 'GET') {
    const chatroom = await client.chatroom.findUnique({
      where: {
        id: +id!,
      },
      include: {
        chatMessages: {
          select: {
            id: true,
            message: true,
            createdAt: true,
            userId: true,
          },
        },
        host: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        guest: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    res.json({ ok: true, chatroom });
  }
}
export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
