import { NextApiRequest, NextApiResponse } from 'next';

export default function withHandler(
  method: 'GET' | 'POST' | 'DELETE',
  // api/users/enter.tsx 함수
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // api/users/enter api를 호출하면 enter의 기본 method "POST"가 withHandler로 전달되고
    // "POST"와 api를 호출할 때 전달된 req.method를 비교해서
    // POST와 일치하지 않으면 405를 리턴하고 연결을 끊어버리는 보호장치를 만듦.
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      // 위 조건을 만족하면 fn = enter의 handler 함수를 호출한다.
      // 그러면 fn은 handler이니 return res.status(200) 을 리턴함.
      //또한 이젠 url로도 접근이 불가. 인자전달이 안되기 때문.
      await fn(req, res);
    } catch (error) {
      //에러가 발생하면 500코드와 함께 에러를 리런.
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
