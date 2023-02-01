import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';

// 시작 전 pscale connect carrot-market 으로
// 프리즈마와 연결해놓고 실행 해야함.
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  let user;
  if (email) {
    // db의 user에서 email 검색
    user = await client.user.findUnique({
      where: {
        email,
        // email:email
      },
    });
    if (user) console.log('found user');
    if (!user) {
      console.log("there's no user, will creat it");
      //there's no user, will creat it
      user = await client.user.create({
        data: {
          name: 'Anonymous',
          email: email,
        },
      });
    }
    console.log(user);
    /*
 {
   id: 3,
   phone: null,
   email: 'test1@gmail.com',
   name: 'Anonymous',
   avatar: null,
   createAt: 2023-02-01T13:43:39.040Z,
   updatedAt: 2023-02-01T13:43:39.040Z
  }
*/
  }

  // db의 user에서 phone 검색
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log('found user');
    if (!user) {
      console.log("there's no user, will creat it");
      //there's no user, will creat it
      user = await client.user.create({
        data: {
          name: 'Anonymous',
          phone: +phone,
        },
      });
    }
    console.log(user);
  }

  return res.status(200).end();
}

export default withHandler('POST', handler);

// 구현 순서
// ---> phone넘버를 백엔드로 -> 백엔드에 폰넘버 해당 유저 검색
// --> 없으면 가입 있으면 데이터베이스에서 정보 가져옴
// -> 토큰 발급(유저와 연결돼있음) -> 토큰(랜덤넘버) SMS로 유저에게 전송(twilio로 구현)
// -> 로그인폼 폰넘버 입력 칸 가리고 토큰입력 칸 추가
// -> 백엔드에서 토큰 정보 검색 -> 일치하는 유저 정보 (로그인O)
