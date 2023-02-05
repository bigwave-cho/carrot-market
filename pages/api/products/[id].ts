import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';
import { truncate } from 'fs';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // query의 타입 string|string[]|undefined
  // 쿼리가 여러개 붙을 수 있고 없을 수도 있음.
  const { id } = req.query;

  const product = await client.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        // db에서 유저 정보 선택적으로 가져오기.
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(' ').map((word) => ({
    //filter 조건
    name: {
      contains: word,
    },
  }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });

  res.json({ ok: true, product, relatedProducts });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
