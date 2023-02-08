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
  } = req;

  const sales = await client.sale.findMany({
    where: {
      userId: user?.id,
    },
    //현재 api/users/me/favs.. 등에는 해당 상품 정보만 들어오지
    //몇개나 좋아요를 받았는지를 보내고 있지 않음.
    //그래서 product 모델의 fav, sales, purchases 필드를 가져오기를 추가
    include: {
      product: {
        include: {
          _count: {
            select: {
              favs: true,
            },
          },
        },
      },
    },
  });

  res.json({
    ok: true,
    sales,
  });
}
export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
