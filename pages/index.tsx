import FloatingButton from '@/components/floating-button';
import Item from '@/components/item';
import Layout from '@/components/layout';
import useUser from '@/libs/client/useUser';
import { Product } from '@prisma/client';
import { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

interface ProudctResponse {
  ok: boolean;
  products: Product[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  // /api/products 는 현재 POST만 받고 있음
  // GET과 POST를 둘 다 처리하도록 withHandler를 리팩터
  const { data } = useSWR<ProudctResponse>('/api/products');
  return (
    <Layout title="Home" hasTabBar>
      <Head>
        <title>HOME</title>
      </Head>
      <div className="flex flex-col space-y-5 py-4">
        {data?.products.map((product, i: number) => (
          <Item
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            comments={1}
            hearts={1}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
