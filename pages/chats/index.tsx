import type { NextPage } from 'next';
// divide 사용해서 구분선 만들기
// border-b 로하면 마지막 item에도 구분선이 생김
// last:border-none 을 이용해도 되지만 tailwind의 divide 이용하면 굳!

const Chats: NextPage = () => {
  return (
    <div className="divide-y-[1px] py-10">
      {[1, 2, 3, 4, 5].map((_, i) => {
        return (
          <div
            key={i}
            className="flex cursor-pointer items-center space-x-3 px-4 py-3"
          >
            <div className="h-12 w-12 rounded-full bg-slate-300" />
            <div>
              <p className=" text-gray-700">Steve Jebs</p>
              <p className="text-sm text-gray-500">내일 봐요 2시에! &rarr;</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Chats;
