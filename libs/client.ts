import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

// 이렇게 데이터를 생성 가능함!
// 대신 이것을 직접 프론트에서 사용하는 것이 아닌
// api를 이용해 개발서버에서 사용하도록 할 것임.
client.user.create({
  data: {
    name: '호호',
    email: 'hi',
  },
});
