import Link from 'next/link';

export default function MathPage() {
    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-800 mb-4">Mathematics</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Explore the world of numbers, operations, and mathematical concepts. Coming soon!
                </p>
            </div>

            <div className="flex justify-center">
                <Link
                    href="/"
                    className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
} 