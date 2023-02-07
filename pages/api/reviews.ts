import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

// 프로필의 리뷰 가져오기
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  const reviews = await client.review.findMany({
    // 리뷰 중에 createdForId가 해당 user.id인 것 찾아와
    where: {
      createdForId: user?.id,
    },
    // 포함해 createdBy(작성한 사람 정보) 가져와.
    include: { createdBy: { select: { id: true, name: true, avatar: true } } },
  });
  res.json({
    ok: true,
    reviews,
  });
}
export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
