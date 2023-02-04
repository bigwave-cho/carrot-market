import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // const { name, price, description } = req.body;
  // const { user } = req.session;
  // 한 줄로 간략하게
  const {
    body: { name, price, description },
    session: { user },
  } = req;
  //withApiSession으로 감싸져있기 때문에 req에 session이 포함되어 있음.
  // 그래서 user 정보를 받아올 수 있는 것.
  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image: 'x',
      user: {
        // 해당 유저의 id와 생산되는 product를 연결.

        connect: {
          id: user?.id,
        },
      },
    },
  });

  return res.json({ ok: true, product });
}
export default withApiSession(
  withHandler({
    method: 'POST',
    handler,
  })
);
