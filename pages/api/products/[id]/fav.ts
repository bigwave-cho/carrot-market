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
  // findUique는 unique한 id 같은 field만 쿼리가능함.
  const alreadyExists = await client.fav.findFirst({
    where: {
      productId: +id!.toString(),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    //delete 하트 클릭 시 fav가 존재하면 삭제
    // delete 또한 unique 필드에만 적용됨.
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    // create  없으면 생성
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id!.toString(),
          },
        },
      },
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
