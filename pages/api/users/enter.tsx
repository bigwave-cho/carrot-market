import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
// upsert를 이용해서 간단하게 : 생성 or 수정할 때 사용
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  // upsert 기본 동작 예시
  // let user;
  // if (phone) {
  //   user = await client.user.upsert({
  //     where: {
  //       phone: +phone,
  //     },
  //     create: {
  //       phone: +phone,
  //       name: 'Anonymous',
  //     },
  //     update: {},
  //   });
  // } else if (email) {
  //   user = await client.user.upsert({
  //     where: {
  //       email: email,
  //     },
  //     create: {
  //       email: email,
  //       name: 'Anonymous',
  //     },
  //     update: {},
  //   });
  // }

  // 리팩터링
  const payload = phone ? { phone: +phone } : { email: email };
  const user = await client.user.upsert({
    where: {
      // ...(phone && { phone: +phone }),
      // ...(email && { email: email }),
      ...payload,
    },
    create: {
      name: 'Anonymous',
      ...payload,
    },
    update: {},
  });
  console.log(user);

  return res.status(200).end();
}

export default withHandler('POST', handler);
