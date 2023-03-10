import useUser from '@/libs/client/useUser';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
/*
SWRConfig
fetcher 기본값을 정하고 글로벌 옵션 지정도 가능.
*/

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  useUser(pathname);

  return (
    <SWRConfig
      value={{
        //refreshInterval: 2000,  : 2초마다 swr 페치
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="mx-auto w-full max-w-xl">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
