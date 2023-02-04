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

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session);
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  console.log(exists);
  if (!exists) return res.status(404).end();
  req.session.user = {
    id: exists.userId,
  };
  await req.session.save();
  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
  cookieName: 'carrotsession',
  password: '12345123451234512345123451234512345',
});
