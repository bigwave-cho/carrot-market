import { NextPage } from 'next';
/*
aspect video : 높이가 화면 비율에 맞춰 자동으로 맞춰짐. ( 16:9)
asepct square : 정사각형.

home index의 버튼 재사용
*/

const Live: NextPage = () => {
  return (
    <div className=" space-y-4 divide-y-2 py-10 ">
      {[1, 2, 3, 4].map((_, i) => {
        return (
          <div className="px-4 pt-4" key={i}>
            <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
            <h3 className="mt-2 text-lg  text-gray-700">
              Let&apos;s try Streaming
            </h3>
          </div>
        );
      })}
      <button className="fixed bottom-24 right-5 cursor-pointer rounded-full bg-orange-400 p-4 text-white transition-colors hover:bg-orange-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Live;
