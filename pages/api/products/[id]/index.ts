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
    session: { user },
  } = req;

  const product = await client.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(' ').map((word) => ({
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
  //findFirst 조건과 일치하는 첫 요소를 리턴.
  //없으면 null 있으면 해당 fav 객체.
  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        productId: product?.id,
        userId: user?.id,
      },
      //모든 필드를 가져오지 않고 id만 가져오도록 설정.
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, product, isLiked, relatedProducts });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
