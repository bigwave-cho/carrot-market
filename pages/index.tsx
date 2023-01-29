import { NextPage } from 'next';

const Home: NextPage = () => {
  // Responsive Modifier
  // tailwind의 모든 클래스네임은 모바일에 우선 적용
  // 큰 화면이 후순위가 된다.
  /*
  Mobile First

기본적으로 Tailwind는 Bootstrap과 같은 다른 프레임워크에서 사용하는 것과 유사한 모바일 우선 breakpoint 시스템을 사용합니다. 이것이 의미하는 바는 접두사가 붙지 않은 유틸리티(예: uppercase)는 모든 화면 크기에 적용되는 반면 접두사가 붙은 유틸리티(예: md:uppercase)는 지정된 breakpoint 이상에서만 적용됩니다.

이 접근 방식이 사람들을 가장 자주 놀라게 하는 부분은 모바일용으로 스타일을 지정하려면 sm: 접두사가 붙은 버전이 아니라 접두사가 없는 버전의 유틸리티를 사용해야 한다는 것입니다. sm을 "작은 화면에서"를 의미하는 것으로 생각하지 마십시오. "작은 breakpoint"로 생각하십시오.
div class="sm:text-center" => 작은 사이즈 (not 모바일)

이러한 이유로 디자인을 위한 모바일 레이아웃을 먼저 구현한 다음 sm 화면에 적합한 변경 사항을 레이어링한 다음 md 화면 등을 적용하는 것이 좋습니다.
```
sm 640px @media (min-width: 640px) { ... }
md 768px @media (min-width: 768px) { ... }
lg 1024px @media (min-width: 1024px) { ... }
xl 1280px @media (min-width: 1280px) { ... }
2xl 1536px @media (min-width: 1536px) { ... }
```
  */
  return (
    <div className="grid min-h-screen gap-10 bg-slate-400 py-20 px-20">
      <div className="rounded-3xl bg-white p-6 shadow-xl sm:bg-red-400 sm:hover:bg-pink-900 md:bg-teal-400 lg:bg-indigo-400 xl:bg-yellow-400 2xl:bg-pink-500">
        <span className="text-2xl font-semibold">Select Item</span>
        <ul>
          <div className="my-2 flex justify-between ">
            <span className="text-gray-500">Grey Chair</span>
            <span className="font-semibold">$19</span>
          </div>
          <div className="my-2 flex justify-between ">
            <span className="text-gray-500">Grey Chair</span>
            <span className="font-semibold">$19</span>
          </div>
        </ul>

        <div className="mt-2 flex justify-between border-t-2 border-dashed pt-2">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <button
          className="mx-auto mt-5 block w-3/4
          rounded-xl bg-blue-500 p-3 text-center text-white 
          hover:bg-teal-500 hover:text-black
          focus:bg-red-500 active:bg-yellow-500
          "
        >
          Checkout
        </button>
      </div>
      <div className="group overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-2xl text-white">Profile</span>
        </div>
        <div className="relative -top-5 rounded-3xl bg-white p-6">
          <div className="relative -top-16 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 rounded-full bg-zinc-300 transition-colors group-hover:bg-red-300" />
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500">Spent</span>
              <span className="font-medium">$340</span>
            </div>
          </div>
          <div className="relative  -mt-14 -mb-5 flex flex-col items-center">
            <span className="text-lg font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">미국</span>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <span>⬅️</span>
          <div className="space-x-3">
            <span>⭐️ 4.9</span>
            <span className="rounded-md p-2 shadow-xl">💖</span>
          </div>
        </div>
        <div className="mb-5 h-72 bg-zinc-400" />
        <div className="flex flex-col">
          <span className="text-xl font-medium">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex items-center justify-between">
            <div className="space-x-2">
              <button className="h-5 w-5 rounded-full bg-yellow-500 ring-yellow-500 ring-offset-2 transition focus:ring-2" />
              <button className="h-5 w-5 rounded-full bg-indigo-500 ring-indigo-500 ring-offset-2 transition focus:ring-2" />
              <button className="h-5 w-5 rounded-full bg-teal-500 ring-teal-500 ring-offset-2 transition focus:ring-2" />
            </div>
            <div className="flex items-center space-x-5">
              <button className=" flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-200 text-xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className=" flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-200 text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-medium">$450</span>
            <button className="rounded-lg bg-blue-500 py-2 px-8 text-center text-xs text-white">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
