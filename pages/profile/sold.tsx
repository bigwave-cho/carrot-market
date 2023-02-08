import Item from '@/components/item';
import Layout from '@/components/layout';
import ProductList from '@/components/product-list';
import { NextPage } from 'next';
import useSWR from 'swr';
import { ProductWithCount } from '..';

// 주석처리한 것들 다 product-list.tsx로 옮김. sold,purchaces, favs에 한번에 적용 위해
// interface Record {
//   id: number;
//   product: ProductWithCount;
// }

// interface ProductListResponse {
//   [key: string]: Record[];
// }

const Sold: NextPage = () => {
  //const { data } = useSWR<ProductListResponse>(`/api/users/me/sales`);
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 divide-y pt-4 pb-10">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
