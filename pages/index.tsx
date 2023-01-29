import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    // group modifier
    // <div className="grid min-h-screen gap-10 bg-slate-400 py-20 px-20">
    //   <div className="rounded-3xl bg-white p-6 shadow-xl">
    //     <span className="text-3xl font-semibold">Select Item</span>
    //     <ul>
    //       {[1, 2, 3, 4, 5].map((i) => {
    //         return (
    //           <div
    //             key={i}
    //             className="my-2 flex justify-between first:bg-blue-50 last:bg-blue-50 only:bg-red-500 odd:bg-blue-500 even:bg-yellow-500"
    //             // * only: 는 chile가 하나일 때 작동함.
    //           >
    //             <span className="text-gray-500">Grey Chair</span>
    //             <span className=" font-semibold">$19</span>
    //           </div>
    //         );
    //       })}
    //     </ul>
    //     <ul>
    //       {['a', 'b', 'c', ''].map((c, i) => {
    //         return (
    //           <li
    //             className="bg-red-500 py-2 empty:hidden"
    //             //empty:hidden 은 null or undefined 요소가 들어오면
    //             // display:none처럼 작동. (empty == null or undefined)
    //             key={i}
    //           >
    //             {c}
    //           </li>
    //         );
    //       })}
    //     </ul>
    //     <div className="mt-2 flex justify-between border-t-2 border-dashed pt-2">
    //       <span>Total</span>
    //       <span className=" font-semibold">$10</span>
    //     </div>

    //     <button className="mx-auto mt-5 block w-3/4 rounded-xl bg-blue-500 p-3 text-center text-white hover:bg-teal-500 hover:text-black focus:text-red-500 active:bg-yellow-500">
    //       CheckOut
    //     </button>
    //   </div>
    //   <div className="group overflow-hidden rounded-3xl bg-white shadow-xl">
    //     <div className=" bg-blue-500 p-6 pb-14">
    //       <span className="text-2xl text-white">Profile</span>
    //     </div>
    //     <div className="relative -top-5 rounded-3xl bg-white p-6">
    //       <div className="relative -top-16 flex items-end justify-between">
    //         <div className="flex flex-col items-center">
    //           <span className="text-sm text-gray-500">Orders</span>
    //           <span className="font-medium">340</span>
    //         </div>
    //         <div className="h-24 w-24 rounded-full bg-zinc-400 transition-colors group-hover:bg-red-300" />
    //         <div className="flex flex-col items-center">
    //           <span className="text-sm text-gray-500">Spent</span>
    //           <span className="font-medium">$340</span>
    //         </div>
    //       </div>
    //       <div className="relative -mt-10 -mb-5 flex flex-col items-center">
    //         <span className="text-lg font-medium">Tony Molloy</span>
    //         <span className="text-sm text-gray-500">미국</span>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="rounded-3xl bg-white p-6 shadow-xl">
    //     <div className="mb-5 flex items-center justify-between">
    //       <span>⬅️</span>
    //       <div className="space-x-3">
    //         <span>⭐️4.9</span>
    //         <span className="rounded-md p-2 shadow-xl">💖</span>
    //       </div>
    //     </div>
    //     <div className="mb-5 h-72 bg-zinc-400" />
    //     <div className="flex flex-col">
    //       <span className="mb-1.5 text-xl font-medium">Swoon Lounge</span>
    //       <span className="text-xs text-gray-500">Chair</span>
    //       <div className="mt-3 mb-5 flex items-center justify-between">
    //         <div className="space-x-2">
    //           <button className="h-5 w-5 rounded-full bg-yellow-500 ring-yellow-500 ring-offset-2 transition focus:ring-2" />
    //           <button className="h-5 w-5 rounded-full bg-indigo-500 ring-indigo-500 ring-offset-2 transition focus:ring-2" />
    //           <button className="h-5 w-5 rounded-full bg-teal-500 ring-teal-500 ring-offset-2 transition focus:ring-2" />
    //         </div>
    //         <div className="flex items-center space-x-5">
    //           <button className="flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-200  text-xl text-gray-500">
    //             -
    //           </button>
    //           <span>1</span>
    //           <button className="flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-200  text-xl text-gray-500">
    //             +
    //           </button>
    //         </div>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <span className="text-2xl font-medium">$450</span>
    //         <button className="rounded-lg bg-blue-500 py-2 px-8 text-center text-xs text-white">
    //           Add to cart
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // form : peer modifier
    // <form className="flex flex-col space-y-2  p-5 focus-within:bg-blue-100 ">
    //   <input
    //     type="text"
    //     required
    //     placeholder="Username"
    //     // 아래 : required 속성 있을 때, required가 충족되지 못한 invalid 상태일 때
    //     // className="border-yellow-500 required:border-2 invalid:bg-red-500"
    //     //아래 : placeholder가 보일 때.
    //     // className="placeholder-shown:bg-teal-500"
    //     // className="required:bg-yellow-500 valid:bg-teal-500 invalid:bg-red-500"
    //     className="peer rounded-lg border border-gray-400 p-1"
    //   />
    //   <span
    //     // ** peer modifire는 input의 state에 따라 이 span의 style을 바꿈(react 없이 가능)
    //     // tailwind의 기능이 아닌 css의 sibling selector가 사용된 것.
    //     // 조건 peer가 먼저 와야하고 그 다음에 다른 것들이 위치해야 함.
    //     className="hidden peer-invalid:block peer-invalid:text-red-500"
    //   >
    //     This input is invalid
    //   </span>
    //   <span className="hidden peer-valid:block peer-valid:text-teal-500">
    //     This input is valid
    //   </span>
    //   <span className="hidden peer-hover:block peer-hover:text-amber-500">
    //     짜잔
    //   </span>
    //   <input type="submit" value="Login" className="bg-white" />
    // </form>

    // detail selector
    // <div className="flex flex-col space-y-2 p-5">
    //   <details
    //     //select-none:하면 select안됨.
    //     className="select-none open:bg-indigo-400 open:text-white"
    //   >
    //     <summary className="cursor-pointer">What is my favorite food</summary>
    //     <span
    //       // select 배경색 지정
    //       className="selection:bg-indigo-600 selection:text-white"
    //     >
    //       김치찌개
    //     </span>
    //   </details>
    // </div>

    // list-decimal & list-disc
    // <div className="flex flex-col space-y-2 p-5">
    //   <ul className="list-disc list-decimal marker:text-teal-500">
    //     <li>hi</li>
    //     <li>hi</li>
    //     <li>hi</li>
    //   </ul>
    // </div>

    // input (file) 여러 modifier 중첩
    // <div className="flex flex-col space-y-2 p-5">
    //   <input
    //     type="file"
    //     className="file:cursor-pointer file:rounded-xl file:border-0 file:bg-purple-500 file:px-5 file:text-white file:transition-colors file:hover:border-2 file:hover:border-purple-400 file:hover:bg-white file:hover:text-purple-400"
    //   />
    // </div>

    // letter  modifier
    <div className="flex flex-col space-y-2 p-5">
      <p className="first-letter:text-7xl first-letter:hover:text-purple-400">
        ㅋㄴㅇㄹ뮝나루인마륀ㅇㄹ
      </p>
    </div>
  );
};

export default Home;
