import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withIronSessionApiRoute } from 'iron-session/next';

/*
iron session
서명, 암호화된 쿠키를 사용하는 Nodejs stateless 세션 도구
세션 토큰 쿠키에 대한 설명 영상(https://www.youtube.com/watch?v=tosLBcAX1vk)


* 쿠키
 {id: 1} ---> 암호화:kdkkdkdkd
 kdkdkd -> 복호화 -> {id:1}
1. user 객체 생성
2.이 user payload 암호화 -> 암호화된 payload를 유저에게 쿠키에 담아 전송
3. 유저가 백엔드로 request할 때마다 request에 담겨 보내짐.
3. 서버는 이 쿠키를 복호화하고 페이지 접근 유저의 id가 1인지 확인.


* JWT 
 유저의 id를 가진 객체에 서명(signature)하고
 이 서명과 함께 유저에게 토큰을 보내는 방식 (암호화 X)
{id:1} ---> sign ---> {id:1, signature:abadsf}
유저는 JWT가 암호화되지 않았기 떄문에 정보를 볼 수도 있음.
유저가 이 JWT를 보냄.
{id:1 signature:abadsf} ---> sign 확인 -> {id:1} 토큰 신뢰

쿠키를 이용했을 때 좋은점
1. JWT가 아니라서 payload에 어떤 정보든 넣을 수 있음.
2. 세션을 위한 백엔드를 구축할 필요가 없다.
3. iron session이 서버리스하게 세션운용하는 것을 도와줌.

iron session 적용
1. npm install iron-session
<API핸들러를 만들고 withIronSessionApiRouter 함수로 감싸주면 iron-session이
요청 객체에 req.session.user를 담아보내준다.>

*/

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //withHandler를 iron함수로 감싸줬기 때문에 session 확인 가능해짐.
  //세션에서 token을 이용해 user를 찾고 save 등을 할 것임.
  console.log(req.session);
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include 해당 token 뿐만 아니라
    // 연결된 user 정보도 가지고 오는 옵션
    include: { user: true },
  });
  //토큰과 일치하는게 있으면 해당 user정보 가져오고, 없으면 null
  console.log(exists);
  if (!exists) res.status(404).end();
  // 확인했으면 userId를 세션에 저장할 차례
  req.session.user = {
    id: exists?.userId,
  };
  await req.session.save();
  // 실행 후 애플리케이션 쿠키 탭 확인해보면 carrotsession이 생성된 것 확인 가능.

  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
  cookieName: 'carrotsession',
  password: '12345123451234512345123451234512345',
});
