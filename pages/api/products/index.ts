import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const products = await client.product.findMany({
      //products 모델에서 자신을 가리키고 있는 fav를 카운트 할 수 있음.
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });
    return res.json({ ok: true, products });
  }
  if (req.method === 'POST') {
    const {
      body: { name, price, description },
      session: { user },
    } = req;
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: 'x',
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    return res.json({ ok: true, product });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
