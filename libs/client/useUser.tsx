import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

// 로그인 상태를 확인해서 리다이렉트 시키는 함수.

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser(pathname?: string) {
  // pathname을 확인해서 enter를 제외한 컴포넌트에 다 적용할 수 있도록 함.

  const router = useRouter();
  const { data, isLoading } = useSWR<ProfileResponse>(
    pathname === '/enter' ? null : '/api/users/me'
  );

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading };
}
