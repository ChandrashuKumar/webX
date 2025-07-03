import { Link } from 'react-router-dom';
import { Spotlight } from '@/components/ui/Spotlight';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-950 text-white relative flex flex-col items-center justify-center px-6 overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 h-[80vh] w-[80vw]" fill="#2563eb" />

      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
          Welcome to Teams ToDo
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Collaborate with your team, assign tasks, and stay organized — all in one place.
        </p>

        <Link to="/signup">
          <button
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
