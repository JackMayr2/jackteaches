import Link from 'next/link';

export default function SciencePage() {
    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-purple-800 mb-4">Science</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Discover the natural world through experiments and exploration. Coming soon!
                </p>
            </div>

            <div className="flex justify-center">
                <Link
                    href="/"
                    className="inline-block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
} 