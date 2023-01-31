import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(401).end();
  }
  console.log(req.body);
  // 네트웤 탭과 터미널(백엔)에서 확인가능. {"email":"afe@gmail.com"}
  console.log(req.body.email);
  //undefined : req의 인코딩 기준으로 인코딩되기 때문임.
  //1321@gmail.com  headers에 컨텐츠타입 설정해주면 나옴.
  //바디의 타입과 헤더의 컨텐츠타입이 일치해야 한다.
  res.status(200).end();
}
