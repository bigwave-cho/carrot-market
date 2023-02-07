import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';
import { Kind } from '@prisma/client';
// prisma에서 Kind 임포트

// me/favs  /purchaces .. 등으로 하는 것 보다는
// 이렇게 Kind를 이용하면 간편!
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { id },
  } = req;
  console.log(Kind);
  let kind;

  if (id === 'fav') {
    kind = Kind.Fav;
  } else if (id === 'purchase') {
    kind = Kind.Purchase;
  } else if (id === 'sale') {
    kind = Kind.Sale;
  }

  const records = await client.record.findMany({
    where: {
      userId: user?.id,
      kind,
    },
  });

  res.json({
    ok: true,
    records,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
