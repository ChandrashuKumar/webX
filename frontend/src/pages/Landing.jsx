import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Teams ToDo</h1>
      <p className="text-lg mb-6 text-gray-300 text-center">
        Collaborate with your team, assign tasks, and stay organized — all in one place.
      </p>
      <Link
        to="/signup"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition"
      >
        Get Started
      </Link>
    </div>
  );
}
