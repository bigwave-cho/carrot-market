import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="bg-red-600">
      <h1 className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
        tailwind works
      </h1>
    </div>
  );
};

export default Home;
