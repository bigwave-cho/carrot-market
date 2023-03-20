import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { productId, sellerId },
    session: { user },
  } = req;

  if (req.method === 'POST') {
    if (user?.id === sellerId) {
      return res
        .status(400)
        .json({ ok: false, message: "You can't talk with yourself" });
    }
    const alreadyExists = await client.chatroom.findFirst({
      where: {
        productId: Number(productId),
        hostId: Number(user?.id),
        guestId: Number(sellerId),
      },
    });
    if (alreadyExists) {
      res.json({
        ok: true,
        chatroomId: alreadyExists.id,
      });
    } else {
      const newChatRoom = await client.chatroom.create({
        data: {
          product: {
            connect: {
              id: productId,
            },
          },
          host: {
            connect: {
              id: user?.id,
            },
          },
          guest: {
            connect: {
              id: sellerId,
            },
          },
        },
      });

      res.json({
        ok: true,
        chatroomId: newChatRoom.id,
      });
    }
  }
  if (req.method === 'GET') {
    const chatrooms = await client.chatroom.findMany({
      where: {
        OR: [{ hostId: user?.id }, { guestId: user?.id }],
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        guest: {
          select: {
            id: true,
            avatar: true,
            name: true,
          },
        },
        host: {
          select: {
            id: true,
            avatar: true,
            name: true,
          },
        },
        chatMessages: {
          select: {
            message: true,
            createdAt: true,
            userId: true,
          },
        },
      },
    });

    res.json({
      ok: true,
      chatrooms: chatrooms,
    });
  }
}
export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
