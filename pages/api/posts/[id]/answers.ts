import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';
import { off } from 'process';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;

  /*
  원래는 이렇게 해당하는 post가 없으면 에러를 리턴해줘야 하는 장치가 필요
  지금은 생략.
  const post = await client.post.findUnique({
    where: {
      id: +id!.toString(),
    },
    select: {
      id: true,
    },
  });
  if (!post) {
    return res.status(404);
  }*/

  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id!.toString(),
        },
      },
      answer,
    },
  });
  console.log(newAnswer);

  //이전까지는 생성한 것들을 리턴해서
  //redirects하는데 이용했지만 이번 경우는 필요없음.
  res.json({
    ok: true,
    //혹시모르니
    answer: newAnswer,
  });
}
export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
