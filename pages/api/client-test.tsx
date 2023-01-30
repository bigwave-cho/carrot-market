import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.user.create({
    data: {
      email: 'gg@gogo.com',
      name: 'hoho',
    },
  });
  // 이렇게 설정해주고 localhost:3000/api/client-test로 접속!
  // 그 후 studio를 확인해보면 user데이터가 추가된 것을 볼 수 있음.
  // 주의! : prisma studio를 실행중일 것!
  res.json({
    ok: true,
  });
}
