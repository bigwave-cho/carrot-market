import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

// 로그인 상태를 확인해서 리다이렉트 시키는 함수.

export default function useUser() {
  const { data, isLoading } = useSWR('/api/users/me');
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]);
  return { user: data?.profile, isLoading };
}
