import '@/styles/globals.css';
import type { AppProps } from 'next/app';

/*
max-w-xs => max-width: 20rem; 320px 
max-w-sm => max-width: 24rem;  384px 
max-w-md => max-width: 28rem;  448px 
max-w-lg => max-width: 32rem;  512px 
max-w-full => max-width: 100%;
max-w-screen-sm => max-width: 640px;
max-w-screen-md => max-width: 768px;
max-w-screen-lg => max-width: 1024px;
max-w-screen-xl => max-width: 1280px;

1. 너비를 최대로 놓고 좌우마진을 오토로 놓으면 div가 중앙으로 옴(당연 block 이어야 함)
2. 아래처럼 설정하면 모바일로 고정되어 화면 중간에 컴포넌트 위치.
3. max-w-[] <- 정해놓은 너비까지만 넓어짐.
*/

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <Component {...pageProps} />
    </div>
  );
}
