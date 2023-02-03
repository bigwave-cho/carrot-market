import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import twilio from 'twilio';
import mail from '@sendgrid/mail';
import { SyncGrant } from 'twilio/lib/jwt/AccessToken';

/*
Sendgrid 를 이용한 이메일 인증 기능 구현
가입 -> Account 생성 -> integration, Web API 클릭
APIKEY 생성해서 .env에 추가한 후 npm install --save @sendgrid/mail
*/

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

mail.setApiKey(process.env.SEND_GRID_API_KEY!);

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
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.TWILIO_PHONE_NUMBER!,

      body: `Your login token is ${payload}`,
    });
    console.log(message);
  } else if (email) {
    const email = await mail.send({
      from: process.env.MY_EMAIL_ADDRESS,
      to: process.env.MY_EMAIL_ADDRESS,
      subject: 'Verify mail',
      text: `Your token is ${payload}`,
      html: `<strong>Your token is ${payload}</strong>`,
    });
    console.log(email);
  }

  return res.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
