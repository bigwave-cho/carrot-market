import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// me api를 호출해서 profile 정보를 가져오는 hook
export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/users/me')
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          // push를 사용하면 history가 남음(redirects / -> /enter)
          // replace는 history를 남기지 않아 뒤로가기를 해도 소용 없음.
          return router.replace('/enter');
        }
        setUser(data.profile);
      });
  }, [router]);
  return user;
}
