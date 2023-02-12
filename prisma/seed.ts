import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

//가짜 데이터 500개
async function main() {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    const stream = await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 18,
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());

/*
위 seed 실행시키는 방법.
npm install ts-node 설치하고.

package.json에 추가해주면 npx prisma db seed를 실행하면 위 seed 를 실행시켜주고
가짜데이터 500개가 추가됨.
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
  */
