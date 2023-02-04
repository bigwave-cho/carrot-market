import { withIronSessionApiRoute } from 'iron-session/next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: 'carrotsession',
  password: process.env.COOKIE_PASSWORD!,
};

// API route에서 session을 받아오는 함수
export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

// SSR 때 session 받아오는 함수 예정
