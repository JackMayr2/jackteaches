'use client';

import Link from 'next/link';
import { useState } from 'react';

// Algebra lessons data
const lessons = [
    {
        id: 'algebra-libs',
        title: 'Algebra-Libs',
        description: 'A fun game where you create your own algebra stories and solve equations',
        level: 'Beginner',
        difficulty: 1,
        duration: '15-20 min',
        category: 'Interactive'
    },
    {
        id: 'linear-equations',
        title: 'Linear Equations Ad-Libs',
        description: 'Create your own linear equations and visualize them on interactive graphs',
        level: 'Intermediate',
        difficulty: 2,
        duration: '20-25 min',
        category: 'Interactive'
    },
    {
        id: 'quadratic-equations',
        title: 'Quadratic Equations',
        description: 'Master the techniques to solve quadratic equations',
        level: 'Intermediate',
        difficulty: 2,
        duration: '45 min',
        category: 'Lesson'
    },
    {
        id: 'inequalities',
        title: 'Inequalities',
        description: 'Learn how to solve and graph linear inequalities',
        level: 'Intermediate',
        difficulty: 2,
        duration: '40 min',
        category: 'Lesson'
    },
    {
        id: 'systems-of-equations',
        title: 'Systems of Equations',
        description: 'Solve for multiple variables using systems of linear equations',
        level: 'Advanced',
        difficulty: 3,
        duration: '50 min',
        category: 'Interactive'
    },
    {
        id: 'advanced-algebra-libs',
        title: 'Advanced Algebra-Libs',
        description: 'Create stories with more complex equations and solve for multiple variables',
        level: 'Advanced',
        difficulty: 4,
        duration: '25-30 min',
        category: 'Interactive'
    },
    {
        id: 'polynomial-functions',
        title: 'Polynomial Functions',
        description: 'Explore higher-degree polynomial equations and their solutions',
        level: 'Expert',
        difficulty: 5,
        duration: '60 min',
        category: 'Lesson'
    }
];

export default function AlgebraPage() {
    const [filter, setFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');

    // Filter lessons based on both category and difficulty
    const filteredLessons = lessons.filter(lesson => {
        const categoryMatch = filter === 'all' ? true : lesson.category.toLowerCase() === filter.toLowerCase();
        const difficultyMatch = difficultyFilter === 'all' ? true : getDifficultyLevel(lesson.difficulty) === difficultyFilter;
        return categoryMatch && difficultyMatch;
    });

    // Function to get difficulty level string based on numerical value
    function getDifficultyLevel(difficulty: number) {
        if (difficulty <= 1) return 'beginner';
        if (difficulty <= 2) return 'intermediate';
        if (difficulty <= 3) return 'advanced';
        return 'expert';
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-800 mb-4">Algebra</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Explore the world of variables, equations, and mathematical relationships. From basic concepts to advanced techniques, our algebra lessons make learning engaging and fun.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-center mb-8 gap-4">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    >
                        All Lessons
                    </button>
                    <button
                        onClick={() => setFilter('lesson')}
                        className={`px-4 py-2 text-sm font-medium ${filter === 'lesson' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    >
                        Traditional Lessons
                    </button>
                    <button
                        onClick={() => setFilter('interactive')}
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${filter === 'interactive' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    >
                        Interactive Activities
                    </button>
                </div>

                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        onClick={() => setDifficultyFilter('all')}
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${difficultyFilter === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    >
                        All Levels
                    </button>
                    <button
                        onClick={() => setDifficultyFilter('beginner')}
                        className={`px-4 py-2 text-sm font-medium ${difficultyFilter === 'beginner' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    >
                        Beginner
                    </button>
                    <button
                        onClick={() => setDifficultyFilter('intermediate')}
                        className={`px-4 py-2 text-sm font-medium ${difficultyFilter === 'intermediate' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    >
                        Intermediate
                    </button>
                    <button
                        onClick={() => setDifficultyFilter('advanced')}
                        className={`px-4 py-2 text-sm font-medium ${difficultyFilter === 'advanced' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    >
                        Advanced
                    </button>
                    <button
                        onClick={() => setDifficultyFilter('expert')}
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${difficultyFilter === 'expert' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    >
                        Expert
                    </button>
                </div>
            </div>

            {/* Results count */}
            <div className="text-center mb-6">
                <p className="text-gray-600">
                    Showing {filteredLessons.length} of {lessons.length} lessons
                </p>
            </div>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessons.map((lesson) => (
                    <div key={lesson.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className={`p-4 ${lesson.category === 'Interactive'
                            ? 'bg-gradient-to-r from-green-500 to-green-700'
                            : 'bg-gradient-to-r from-blue-500 to-blue-700'
                            }`}>
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`inline-block w-2 h-2 rounded-full ml-1 ${i < lesson.difficulty ? 'bg-yellow-300' : 'bg-gray-300 bg-opacity-50'
                                            }`}></span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 mb-4">{lesson.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                <span>Level: {lesson.level}</span>
                                <span>Duration: {lesson.duration}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${lesson.category === 'Interactive' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {lesson.category}
                                </span>
                                <Link
                                    href={`/subjects/algebra/lessons/${lesson.id}`}
                                    className={`inline-block text-white py-2 px-4 rounded ${lesson.category === 'Interactive' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                                        } transition-colors`}
                                >
                                    Start Lesson
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 