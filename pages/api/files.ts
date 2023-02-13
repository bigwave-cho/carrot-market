/*
  1. /api/files로 요청
  2. Cloudflare 빈 URL 응답
  3. 해당 URL을 이용하여 파일 업로드
  */

import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

// 프로필의 리뷰 가져오기
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
      }
    )
  ).json();

  res.json({
    ok: true,
    ...response.result,
  });
}
export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
