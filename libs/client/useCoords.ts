import { useEffect, useState } from 'react';

interface useCoordsState {
  longitude: number | null;
  latitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<useCoordsState>({
    latitude: null,
    longitude: null,
  });

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };

  useEffect(() => {
    //위치 찾기 성공하면 실행할 함수 onSuccess
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  // 완성했으면 prisma scheme에 공간 창출
  return coords;
}
