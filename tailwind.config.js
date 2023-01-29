/** @type {import('tailwindcss').Config} */
module.exports = {
  // tailwind가 어디서 사용될 것인지 설정
  // pages 폴더 / 모든 디렉토리 / 모든 파일(해당확장자)
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  // 기본값 media(컴 설정에 따라) or class(수동변경하곺다)
  darkMode: 'media',
  plugins: [],
};
