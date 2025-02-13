import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-900 text-white justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-red-500">
        Scratch & Match: Valentine’s Edition 💖
      </h1>
      <p className="text-lg text-gray-700 mt-4 max-w-lg">
        Take a fun personality test, scratch to reveal your Valentine
        personality, and check your match compatibility!
      </p>
      <Link to="/quiz">
        <button className="mt-6 px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-600 transition">
          Start the Test.. 💘
        </button>
      </Link>
    </div>
  );
}

export default Home;
