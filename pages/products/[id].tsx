import Button from '@/components/button';
import Layout from '@/components/layout';
import useMutation from '@/libs/client/useMutation';
import useUser from '@/libs/client/useUser';
import { cls } from '@/libs/client/utils';
import { Product, User } from '@prisma/client';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}
// unbound mutaion 적용해보기.
const ItemDetail: NextPage = () => {
  const { user, isLoading } = useUser();
  //unbound mutation 가져오기
  //제한되지 않았기 때문에 변경하려는 데이터를 정확히 명시해야 한다.
  const { mutate } = useSWRConfig();
  console.log(user);
  const router = useRouter();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );

  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    // setState(sldfk) : 덮어쓰기
    // setstate(prev=>({...prev, daf})) : 이전 데이터 이용해서 덮기랑 비슷함.
    boundMutate((prev) => prev && { ...prev, isLiked: !data.isLiked }, false);
    //mutate(key,data,revalidate) : key - 다룰 데이터
    //useUser함수에서 캐싱된 데이터를 변경 가능.
    mutate('/api/users/me', (prev: any) => ({ ok: !prev.ok }), false);

    //만약 데이터 수정이 아니라 해당 데이터를 리패치하고 싶으면
    // mutate('/api/users/me') <- 이렇게 호출해주면 됨.

    // toggleFav({});
  };

  return (
    <Layout canGoBack>
      <div className="px-4 py-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex cursor-pointer items-center space-x-3 border-t border-b py-3">
            <div className="h-12 w-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.product?.user.name}
              </p>
              <Link
                href={`/users/profiles/${data?.product?.id}`}
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
                  {data?.product?.name}
                </h1>
                <span className="mt-3 block text-2xl text-gray-900">
                  ₩{data?.product?.price}
                </span>
                <p className=" my-6 text-gray-700">
                  {data?.product?.description}
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
              <button
                onClick={onFavClick}
                className={cls(
                  'flex items-center justify-center rounded-md p-3',
                  data?.isLiked
                    ? 'text-red-600 hover:bg-gray-100 hover:text-red-500'
                    : 'text-gray-400 hover:bg-gray-100 hover:text-gray-500'
                )}
              >
                {!data?.isLiked ? (
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
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                )}
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
