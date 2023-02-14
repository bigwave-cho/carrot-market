import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'POST') {
    const {
      // 여기는 커뮤니티 글 썼을 때 위치 정보
      body: { question, longitude, latitude },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        question,
        longitude,
        latitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === 'GET') {
    //query가 제공하는 것 두 가지
    //1. url에 변수로 작성한 param .. [id]
    //2. 쿼리 파라미터로 작성한 것  ?a=sdf&b=sadf
    const {
      query: { latitude, longitude },
    } = req;

    const parsedLatitude = parseFloat(latitude!.toString());
    const parsedLongitude = parseFloat(longitude!.toString());

    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wonderings: true,
            answers: true,
          },
        },
      },
      /*
      찾는 범위 조건
      lat -0.01 ~ lat +0.01
      lng -0.01 ~ lat +0.01
      */
      where: {
        latitude: {
          gte: parsedLatitude - 0.01,
          lte: parsedLatitude + 0.01,
        },
        longitude: {
          gte: parsedLongitude - 0.01,
          lte: parsedLongitude + 0.01,
        },
      },
    });
    res.json({
      ok: true,
      posts,
    });
  }
}
export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
