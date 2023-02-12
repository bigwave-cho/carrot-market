import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;

  if (req.method === 'POST') {
    const stream = await client.stream.create({
      data: {
        name,
        price: price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, stream });
  }
  if (req.method === 'GET') {
    const streams = await client.stream.findMany({
      //가져올 데이터 개수 정하기
      take: 10,
      // skip: 첫 n개 건너뛰기
      skip: 10,
    });
    res.json({ ok: true, streams });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
