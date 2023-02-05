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
  } = req;

  const post = await client.post.findUnique({
    //해당 id의 포스트 찾기.
    where: {
      id: +id!.toString(),
    },
    include: {
      //user를 가져오는데 id, avatar, name만 가져오기
      user: {
        select: {
          id: true,
          avatar: true,
          name: true,
        },
      },
      // answers에서
      answers: {
        select: {
          // answer 문자와 answer의 id, answer를 쓴 user정보가져오기
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      // answers와 wondering 개수 가져오기.
      _count: {
        select: {
          answers: true,
          wonderings: true,
        },
      },
    },
  });

  res.json({
    ok: true,
    post,
  });
}
export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
