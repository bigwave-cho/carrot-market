import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
// NextJS에서 api를 만들 때는 해당 function을 export default해야 작동한다.
// 또한 해당 함수는 함수를 리턴해야 한다.
async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  return res.status(200).end();
}

export default withHandler('POST', handler);
// 아래와 같은 펑션을 리턴하고 있는 것.
// async function (req: NextApiRequest, res: NextApiResponse) {
//    ... handler는 withHandler에서 실행된다.
//   };
