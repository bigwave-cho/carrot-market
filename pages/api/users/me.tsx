import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withIronSessionApiRoute } from 'iron-session/next';

//req.session.user 부분 ts에러 잡기.
declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

// 목표: 브라우저가 받은 쿠키가 유용한지, 이용해서 프로파일 확인가능한지.

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

// 현재 모든 api는 서버리스하게 개별 작동하기 때문에
// 각 api마다 type과 withIron... 함수를 매번 설정해야 함.
// 또한 쿠키탭에 아래 네임의 세션이 생성되어 있기 때문에
// 쿠키탭에서 가져올 수 있는 것이고
// 나중엔 로그아웃시 해당 세션을 destroy 할 수 있도록 설정할 예정임.
export default withIronSessionApiRoute(withHandler('GET', handler), {
  cookieName: 'carrotsession',
  password: '12345123451234512345123451234512345',
});
