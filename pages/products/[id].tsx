import Button from '@/components/button';
import Layout from '@/components/layout';
import { Product, User } from '@prisma/client';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

interface ProductWithUser extends Product {
  user: User;
}
// data에 타입 적용하기.
// 그냥 아래의 인터페이스를 적용하면 Product에는
// user에 대한 타입이 없기 때문에 위처럼 Product인터페이스에 user타입을 extends!

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  console.log(data);
  return (
    <Layout canGoBack>
      <div className="px-4 py-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex cursor-pointer items-center space-x-3 border-t border-b py-3">
            <div className="h-12 w-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.product.user.name}
              </p>
              <Link
                href={`/users/profiles/${data?.product.id}`}
                className="text-xs font-medium text-gray-500"
              >
                View profile &rarr;
              </Link>
            </div>
          </div>
          <div className="mt-5">
            {data ? (
              <>
                <h1 className="text-3xl font-bold text-gray-900">
                  {data?.product.name}
                </h1>
                <span className="mt-3 block text-2xl text-gray-900">
                  ₩{data?.product.price}
                </span>
                <p className=" my-6 text-gray-700">
                  {data?.product.description}
                </p>
              </>
            ) : (
              <div className="flex w-full flex-1 flex-col items-center px-20 pb-20">
                <div className="mt-12 w-1/2 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6 ">
                  <div className="flex flex-col space-y-2">
                    <div className="h-6 w-11/12 rounded-md bg-gray-200 text-center font-bold text-orange-500 ">
                      Loading...
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller"></Button>
              <button className="flex items-center justify-center rounded-md p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <svg
                  className="h-6 w-6 "
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>{' '}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {data?.relatedProducts.map((product) => (
              <div key={product.id}>
                <Link href={`/products/${product.id}`}>
                  <div className="mb-4 h-56 w-full bg-slate-300" />
                  <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                  <span className="text-sm font-medium text-gray-900">
                    ₩{product.price}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
