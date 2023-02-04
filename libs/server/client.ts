import { PrismaClient } from '@prisma/client';

declare global {
  // 전역에 client 타입 선언
  var client: PrismaClient | undefined;
}

// 첫 실행 시 global.client는 생성되지 않음.
const client = global.client || new PrismaClient();

// 개발 모드 일 때 global.client에 client할당.
if (process.env.NODE_ENV === 'development') global.client = client;

export default client;
