import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;

  const payload = phone ? { phone: +phone } : { email: email };
  // const user = await client.user.upsert({
  //   where: {
  //     // ...(phone && { phone: +phone }),
  //     // ...(email && { email: email }),
  //     ...payload,
  //   },
  //   create: {
  //     name: 'Anonymous',
  //     ...payload,
  //   },
  //   update: {},
  // });
  const token = await client.token.create({
    /*
    data로 들어가서 tokenCreateInput 들어가서 확인해보면 user 타입이 나오고 해당 타입에서 create, connect등 확인 가능.
    */
    data: {
      payload: Math.floor(100000 + Math.random() * 900000) + '',
      user: {
        // connect: {
        //   // Data modle User와 Token을 연결
        //   // 엔터 작동하고 npx prisma studio로 가보면 token이 생성되고 User와 연결된 것을 확인 가능.
        //   id: user.id,
        // },

        //connect: 새 토큰을 이미 존재하는 유저와 연결
        //create : 새 토큰을 만들며 user도 생성
        //connectOrCreate : 새 토큰을 만들며 user있으면 커넥, 없으면 생성!
        // ***** 중요 : createOrConnect로 새 user를 만드는 과정이 필요없어짐.
        // 따라서 위 user 부분 주석처리는 필요없어짐을 의미함.
        connectOrCreate: {
          // Data modle User와 Token을 연결
          // 엔터 작동하고 npx prisma studio로 가보면 token이 생성되고 User와 연결된 것을 확인 가능.
          where: {
            ...payload,
          },
          create: {
            name: 'Anonymous',
            ...payload,
          },
        },
      },
    },
  });
  console.log(token);
  //npx prisma push db를 하면 db를 수정함과 동시에 prisma client를 새로 만들어준다.
  //client가 재생성이 되어야 Token db가 있는 client를 이용가능하다.

  return res.status(200).end();
}

export default withHandler('POST', handler);

//현재상황: token data의 payload가 고정되어있기 때문에 회원가입을 두 번 실시하면
//Unique constraint failed on the (not available) 이런 에러가 터미널에 뜸.
// 그래서 랜덤숫자로 이루어진 string을 적용했음.
