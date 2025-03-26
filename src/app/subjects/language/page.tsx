import Link from 'next/link';

export default function LanguagePage() {
    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-red-800 mb-4">Language Arts</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Develop your reading, writing, and communication skills. Coming soon!
                </p>
            </div>

            <div className="flex justify-center">
                <Link
                    href="/"
                    className="inline-block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
} 