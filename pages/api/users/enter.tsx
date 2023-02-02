import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import twilio from 'twilio';

/*
Message service sid와 본인 폰넘버도 .env에 추가
npm install twilio
*/

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

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
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.TWILIO_PHONE_NUMBER!,
      // 원래는 req.body의 폰 넘버를 받아야 하지만
      // 계정이 트라이얼이라 내 폰 번호로 보내는 것만 가능하기 때문에
      // 내 번호 넣음. 가입은 되는데 내 번호로 문자 옴.
      body: `Your login token is ${payload}`,
    });
    console.log(message);
  }

  return res.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
