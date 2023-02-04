import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

// 인증되지 않은 요청(로그인 하지 않은 상태)에 의한 페이지 접근으로부터 보호하기
// 로그인 되지 않은 채로 접근하면 에러가 뜨니까.
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.json({
    ok: true,
    profile,
  });
}
export default withApiSession(
  withHandler({
    method: 'GET',
    handler,
  })
);
