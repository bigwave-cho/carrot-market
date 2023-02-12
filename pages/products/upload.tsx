import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import TextArea from '@/components/textarea';
import useMutation from '@/libs/client/useMutation';
import { Product } from '@prisma/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
}

interface UnloadProductMutaion {
  ok: boolean;
  // prisma가 알아서 product 타입을 만들어 줬음.
  product: Product;
}

const Upload: NextPage = () => {
  const { register, handleSubmit } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] =
    useMutation<UnloadProductMutaion>('/api/products');
  const router = useRouter();

  const onValid = (data: UploadProductForm) => {
    if (loading) return;
    uploadProduct(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Upload Product">
      <form onSubmit={handleSubmit(onValid)} className="space-y-5 px-4 py-10">
        <div>
          <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <Input
          register={register('name', { required: true })}
          label="Name"
          name="name"
          type="text"
          required
        ></Input>
        <Input
          register={register('price', { required: true })}
          label="Price"
          name="price"
          type="text"
          kind="price"
          required
        />
        <TextArea
          register={register('description', { required: true })}
          label="Description"
          name="description"
          required
        />
        <Button text={loading ? 'Loading...' : 'Upload item'} />
      </form>
    </Layout>
  );
};

export default Upload;
/*
Cloudflare란?
(클라우드를 위해 만들어진 전역 네트워크)
Cloudflare는 인터넷에 연결하는 모든 것을 안전하고 비밀을 유지하면서 신속하고 안정적으로 연결하도록 설계된 전역 네트워크입니다.
https://www.cloudflare.com/ko-kr/products/cloudflare-images/

Cloudflare Images
대규모로 이미지를 저장, 크기 조정, 최적화하는 하나의 API
Cloudflare Images는 이미지 인프라를 구축하고 유지하는 효율적인 솔루션을 제공합니다. 하나의 통합 제품을 이용해 이미지를 대규모로 저장, 크기 조정, 최적화합니다.

1. 이미지 저장
아무리 많은 이미지라도 Cloudflare Images에 저장할 수 있습니다.

2. 이미지 크기 조정 및 최적화
보관 및 크기 조정의 추가 비용 없이 모든 이미지를 조정할 수 있습니다.

3. 전달
전세계 Cloudflare 데이터 센터에서 이미지를 전달합니다.

Cloudflare 회원가입
https://dash.cloudflare.com/sign-up
*/
