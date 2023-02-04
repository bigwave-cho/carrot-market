import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

// me api를 호출해서 profile 정보를 가져오는 hook
// SWR을 사용하여 리팩터링하기
// 장점: useUser를 매번 호출하게 되면 처음에 undefined가 출력되고 그 다음에 profile이 출력됨을 확인할 수 있다.
// 또한 매번 데이터 요청을 하는 방식은 지양.
// SWR은 데이터를 캐싱했다가 바로 가져와 사용할 수 있도록 해준다.
// 즉 이전의 데이터를 그대로 가져와주는데 당연히 뒤로는 api요청을 보내서 데이터를 대조한 다음
// 변경사항이 있으면 알아서 업데이트 해준다.
// 공식문서 : https://swr.vercel.app/ko

//fetcher함수는 데이터를 불러와서 프로미스채로 리턴해줌
const fetcher = (url: string) => {
  return fetch(url).then((response) => response.json());
};

export default function useUser() {
  // useSWR(key, fetch함수) : 이 한 줄의 코드로 이전의 useState~ useEffect 코드를 대체 가능하게 됨.
  // key는 fetch의 api 뿐만 아니라 해당 데이터의 id 역할도 수행.
  const { data, error, mutate } = useSWR('/api/users/me', fetcher);
  //mutate : 캐시 내에 저장된 data를 수정하는 함수.
  // 미친 기능. 유저가 다른 탭 갔다오게 되면 알아서 데이터 새로고침해서 보여줌.
  const router = useRouter();

  return data.profile;
}

/*
useSWR의 내부의 super_cache
따라서 다른 페이지에서도 useUser 훅의 swr('urlA')을 사용하면 해당 urlA의 이름으로 캐시된 데이터를 가져오게 됨.
super_cache= {
  "/api/users/me" :{
    "ok": true,
    "profile": {
        "id": 18,
        "phone": "12345678",
        "email": null,
        "name": "Anonymous",
        "avatar": null,
        "createAt": "2023-02-04T06:13:52.679Z",
        "updatedAt": "2023-02-04T06:13:52.679Z"
    }
}
}

*/
