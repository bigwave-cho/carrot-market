import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';

/*
Twilio 생성하기!
접속 -> 아이디만들면 15달러 무료로 줌.
SID와 토큰을 환경변수에 등록
-> Messaging -> Services에서 서비스 하나 1단계까지만 만들고
-> Try it out의 get setup에서 폰넘버 만들기
-> Try SMS -> 트라이얼 계정이기 때문에 받는 폰 넘버 바꾸기 안됨. 내 폰으로 문자옴.
*/

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email: email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });
  console.log(token);

  return res.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
