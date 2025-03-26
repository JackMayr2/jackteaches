'use client';

import Link from 'next/link';
import { useState } from 'react';

const subjects = [
    { name: 'Math', path: '/subjects/math' },
    { name: 'Algebra', path: '/subjects/algebra' },
    { name: 'Science', path: '/subjects/science' },
    { name: 'Language Arts', path: '/subjects/language' },
    { name: 'History', path: '/subjects/history' },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold">JackTeaches</span>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {subjects.map((subject) => (
                            <Link
                                key={subject.name}
                                href={subject.path}
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                            >
                                {subject.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {subjects.map((subject) => (
                            <Link
                                key={subject.name}
                                href={subject.path}
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {subject.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
} 