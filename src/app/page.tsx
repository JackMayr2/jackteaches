import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to JackTeaches
        </h1>
        <p className="text-xl mb-8">
          Your interactive learning platform for subjects across the curriculum
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {/* Featured Subjects */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4">
              <h3 className="text-xl font-semibold text-white">Math</h3>
            </div>
            <div className="p-6">
              <p className="mb-4">Explore numbers, operations, and problem-solving</p>
              <Link
                href="/subjects/math"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Start Learning
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-green-500 to-green-700 p-4">
              <h3 className="text-xl font-semibold text-white">Algebra</h3>
            </div>
            <div className="p-6">
              <p className="mb-4">Master equations, variables, and algebraic thinking</p>
              <Link
                href="/subjects/algebra"
                className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
              >
                Start Learning
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-4">
              <h3 className="text-xl font-semibold text-white">Science</h3>
            </div>
            <div className="p-6">
              <p className="mb-4">Discover the natural world through experiments and exploration</p>
              <Link
                href="/subjects/science"
                className="inline-block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Why JackTeaches?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Interactive Learning</h3>
              <p>Engage with lessons that make learning fun and memorable</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Comprehensive Subjects</h3>
              <p>Cover all major subjects with detailed and clear lessons</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Learn at Your Pace</h3>
              <p>Take your time and master concepts before moving forward</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
