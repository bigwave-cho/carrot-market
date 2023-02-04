import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //1. 토큰을 받아
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  //2. 토큰이 없으면 404 반환
  if (!foundToken) return res.status(404).end();
  //3. 있으면 해당 토큰을 보유한 User의 id를 session.user에 할당
  req.session.user = {
    id: foundToken.userId,
  };
  //4. 저장하고
  await req.session.save();
  //5. 해당 userId와 일치하는 토큰을 전부 삭제
  // 왜? 로그인할 때 마다 토큰이 생성되고 user와 연결되는데
  // 토큰은 업데이트 되는 것이 아니라 쌓인다. 그래서 로그인을 성공하고 나면 전부 지워서
  // 비워주는 것이 장기적으로 굳!
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  res.json({ ok: true });
}

export default withApiSession(withHandler('POST', handler));
