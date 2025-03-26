'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';

// Define types for our input fields
type InputField = {
    id: string;
    label: string;
    type: 'number' | 'text';
    placeholder: string;
};

// Define types for our linear equation templates
type EquationTemplate = {
    title: string;
    description: string;
    fields: InputField[];
    generateEquation: (inputs: Record<string, string>) => {
        story: string;
        equation: string;
        slope: number;
        yIntercept: number;
        xPoints: number[];
        yPoints: number[];
        explanation: string;
        questionX: number;
        questionAnswerY: number;
    };
};

// Linear equation templates with placeholders for user inputs
const equationTemplates: EquationTemplate[] = [
    {
        title: "The Savings Plan",
        description: "Create a linear equation representing savings over time",
        fields: [
            { id: "initialAmount", label: "Initial Amount ($)", type: "number", placeholder: "Enter starting amount" },
            { id: "weeklySavings", label: "Weekly Savings ($)", type: "number", placeholder: "Enter weekly savings" },
            { id: "name", label: "Person's Name", type: "text", placeholder: "Enter a name" },
            { id: "goal", label: "Savings Goal", type: "text", placeholder: "Enter a goal (e.g., vacation)" },
        ],
        generateEquation: (inputs: Record<string, string>) => {
            const initialAmount = parseFloat(inputs.initialAmount);
            const weeklySavings = parseFloat(inputs.weeklySavings);

            // Generate points for the graph (8 weeks)
            const xPoints = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            const yPoints = xPoints.map(x => initialAmount + weeklySavings * x);

            // Generate a question - how much money after 12 weeks?
            const questionX = 12;
            const questionAnswerY = initialAmount + weeklySavings * questionX;

            return {
                story: `${inputs.name} is saving money for ${inputs.goal}. ${inputs.name} starts with $${initialAmount} and saves $${weeklySavings} each week. How much money will ${inputs.name} have after a certain number of weeks?`,
                equation: `y = ${weeklySavings}x + ${initialAmount}`,
                slope: weeklySavings,
                yIntercept: initialAmount,
                xPoints,
                yPoints,
                explanation: `In this linear equation:
                
• y represents the total amount saved
• x represents the number of weeks
• ${weeklySavings} is the rate of change (slope), or how much is saved each week
• ${initialAmount} is the y-intercept, or the starting amount

The equation y = ${weeklySavings}x + ${initialAmount} can be used to calculate how much money ${inputs.name} will have saved after any number of weeks.

For example:
• After 0 weeks: $${initialAmount + weeklySavings * 0} 
• After 4 weeks: $${initialAmount + weeklySavings * 4}
• After 8 weeks: $${initialAmount + weeklySavings * 8}

This is a linear equation because the rate of change is constant (${inputs.name} saves the same amount each week).`,
                questionX,
                questionAnswerY
            };
        }
    },
    {
        title: "The Road Trip",
        description: "Create a linear equation representing distance over time",
        fields: [
            { id: "speed", label: "Driving Speed (mph)", type: "number", placeholder: "Enter speed" },
            { id: "initialDistance", label: "Initial Distance (miles)", type: "number", placeholder: "Enter starting distance" },
            { id: "traveler", label: "Traveler's Name", type: "text", placeholder: "Enter a name" },
            { id: "destination", label: "Destination", type: "text", placeholder: "Enter a destination" },
        ],
        generateEquation: (inputs: Record<string, string>) => {
            const speed = parseFloat(inputs.speed);
            const initialDistance = parseFloat(inputs.initialDistance);

            // Generate points for the graph (10 hours)
            const xPoints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const yPoints = xPoints.map(x => initialDistance + speed * x);

            // Generate a question - distance after 15 hours?
            const questionX = 15;
            const questionAnswerY = initialDistance + speed * questionX;

            return {
                story: `${inputs.traveler} is on a road trip to ${inputs.destination}. ${inputs.traveler} starts ${initialDistance} miles from home and drives at ${speed} miles per hour. How far from home will ${inputs.traveler} be after a certain number of hours?`,
                equation: `y = ${speed}x + ${initialDistance}`,
                slope: speed,
                yIntercept: initialDistance,
                xPoints,
                yPoints,
                explanation: `In this linear equation:
                
• y represents the total distance from home (in miles)
• x represents the time elapsed (in hours)
• ${speed} is the rate of change (slope), or how fast ${inputs.traveler} is traveling
• ${initialDistance} is the y-intercept, or the starting distance from home

The equation y = ${speed}x + ${initialDistance} can be used to calculate ${inputs.traveler}'s distance from home after any number of hours.

For example:
• After 0 hours: ${initialDistance + speed * 0} miles
• After 5 hours: ${initialDistance + speed * 5} miles
• After 10 hours: ${initialDistance + speed * 10} miles

This is a linear equation because the rate of change is constant (${inputs.traveler} drives at a constant speed).`,
                questionX,
                questionAnswerY
            };
        }
    },
    {
        title: "The Temperature Conversion",
        description: "Create a linear equation converting between temperature scales",
        fields: [
            { id: "fromScale", label: "From Scale", type: "text", placeholder: "Enter starting scale (e.g., Celsius)" },
            { id: "toScale", label: "To Scale", type: "text", placeholder: "Enter target scale (e.g., Fahrenheit)" },
            { id: "slope", label: "Conversion Factor", type: "number", placeholder: "Enter conversion factor (e.g., 1.8)" },
            { id: "intercept", label: "Conversion Offset", type: "number", placeholder: "Enter offset (e.g., 32)" },
        ],
        generateEquation: (inputs: Record<string, string>) => {
            const slope = parseFloat(inputs.slope);
            const intercept = parseFloat(inputs.intercept);

            // Generate points for the graph
            const xPoints = [-30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
            const yPoints = xPoints.map(x => slope * x + intercept);

            // Generate a question - convert 40 degrees?
            const questionX = 40;
            const questionAnswerY = slope * questionX + intercept;

            return {
                story: `You need to convert temperatures from ${inputs.fromScale} to ${inputs.toScale}. The formula involves multiplying the ${inputs.fromScale} temperature by ${slope} and then adding ${intercept}. What is the ${inputs.toScale} temperature for a given ${inputs.fromScale} temperature?`,
                equation: `y = ${slope}x + ${intercept}`,
                slope,
                yIntercept: intercept,
                xPoints,
                yPoints,
                explanation: `In this linear equation:
                
• y represents the temperature in ${inputs.toScale}
• x represents the temperature in ${inputs.fromScale}
• ${slope} is the conversion factor (slope)
• ${intercept} is the offset (y-intercept)

The equation y = ${slope}x + ${intercept} can be used to convert any ${inputs.fromScale} temperature to ${inputs.toScale}.

For example:
• ${inputs.fromScale} 0° = ${slope * 0 + intercept}° ${inputs.toScale}
• ${inputs.fromScale} 20° = ${slope * 20 + intercept}° ${inputs.toScale}
• ${inputs.fromScale} 100° = ${slope * 100 + intercept}° ${inputs.toScale}

This is a linear equation because the relationship between the two temperature scales is a straight line.`,
                questionX,
                questionAnswerY
            };
        }
    }
];

export default function LinearEquations() {
    const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [result, setResult] = useState<{
        story: string;
        equation: string;
        slope: number;
        yIntercept: number;
        xPoints: number[];
        yPoints: number[];
        explanation: string;
        questionX: number;
        questionAnswerY: number;
    } | null>(null);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [showSolution, setShowSolution] = useState<boolean>(false);

    const handleTemplateSelect = (index: number) => {
        setSelectedTemplate(index);
        setInputs({});
        setResult(null);
    };

    const handleInputChange = (id: string, value: string) => {
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (selectedTemplate === null) return;

        const template = equationTemplates[selectedTemplate];
        const generatedResult = template.generateEquation(inputs);
        setResult(generatedResult);
    };

    const handleAnswerSubmit = () => {
        if (!result) return;

        const userAnswerNum = parseFloat(userAnswer);
        if (isNaN(userAnswerNum)) {
            return;
        }

        // Check if the answer is correct with some tolerance for floating point comparison
        const isCorrect = Math.abs(userAnswerNum - result.questionAnswerY) < 0.01;
        setIsAnswerCorrect(isCorrect);
    };

    // This function will draw the graph on a canvas element
    useEffect(() => {
        if (!result) return;

        const canvas = document.getElementById('graph-canvas') as HTMLCanvasElement;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const width = canvas.width;
        const height = canvas.height;

        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();

        // X-axis
        const xAxisY = height - 50;
        ctx.moveTo(50, xAxisY);
        ctx.lineTo(width - 20, xAxisY);

        // Y-axis
        ctx.moveTo(50, 20);
        ctx.lineTo(50, height - 20);

        // Arrows
        ctx.moveTo(width - 20, xAxisY);
        ctx.lineTo(width - 30, xAxisY - 5);
        ctx.moveTo(width - 20, xAxisY);
        ctx.lineTo(width - 30, xAxisY + 5);

        ctx.moveTo(50, 20);
        ctx.lineTo(45, 30);
        ctx.moveTo(50, 20);
        ctx.lineTo(55, 30);

        ctx.stroke();

        // Get scale for x and y axis
        const xPoints = result.xPoints;
        const yPoints = result.yPoints;

        const xMin = Math.min(...xPoints);
        const xMax = Math.max(...xPoints);
        const yMin = Math.min(...yPoints, 0);  // Include 0 for better visualization
        const yMax = Math.max(...yPoints);

        const xRange = xMax - xMin;
        const yRange = yMax - yMin;

        const xScale = (width - 70) / xRange;
        const yScale = (height - 70) / yRange;

        // Draw x-axis labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';

        // X-axis label
        ctx.fillText('x', width - 10, xAxisY + 15);

        // Y-axis label
        ctx.textAlign = 'right';
        ctx.fillText('y', 40, 15);

        // Draw grid and labels for x-axis
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.textAlign = 'center';

        for (let i = 0; i <= xRange; i++) {
            const x = 50 + i * xScale;
            const label = xMin + i;

            // Grid line
            ctx.beginPath();
            ctx.moveTo(x, 20);
            ctx.lineTo(x, height - 20);
            ctx.stroke();

            // Label
            ctx.fillText(label.toString(), x, xAxisY + 20);
        }

        // Draw grid and labels for y-axis
        const yStep = Math.ceil(yRange / 10);
        ctx.textAlign = 'right';

        for (let i = 0; i <= yRange; i += yStep) {
            const y = xAxisY - i * yScale;
            const label = yMin + i;

            // Grid line
            ctx.beginPath();
            ctx.moveTo(50, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();

            // Label
            ctx.fillText(label.toString(), 45, y + 4);
        }

        // Plot the line
        ctx.strokeStyle = '#3b82f6';  // Blue color
        ctx.lineWidth = 3;
        ctx.beginPath();

        for (let i = 0; i < xPoints.length; i++) {
            const x = 50 + (xPoints[i] - xMin) * xScale;
            const y = xAxisY - (yPoints[i] - yMin) * yScale;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();

        // Add points
        ctx.fillStyle = '#3b82f6';  // Blue color

        for (let i = 0; i < xPoints.length; i++) {
            const x = 50 + (xPoints[i] - xMin) * xScale;
            const y = xAxisY - (yPoints[i] - yMin) * yScale;

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Add equation to the graph
        ctx.fillStyle = '#333';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(result.equation, width / 2, 40);

    }, [result]);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="mb-8">
                <Link
                    href="/subjects/algebra"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Algebra Lessons
                </Link>
            </div>

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-blue-800">Linear Equations Ad-Libs</h1>
                <p className="text-gray-600 mt-2">
                    Create your own linear equations and visualize them on a graph.
                </p>
                <div className="flex justify-center mt-2">
                    <div className="inline-flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-gray-300 mr-1">☆</span>
                        <span className="text-gray-300 mr-1">☆</span>
                        <span className="text-gray-300">☆</span>
                        <span className="ml-2 text-gray-600 text-sm">Difficulty: Intermediate</span>
                    </div>
                </div>
            </div>

            {selectedTemplate === null ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Choose a Linear Equation Scenario:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {equationTemplates.map((template, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition-colors"
                                onClick={() => handleTemplateSelect(index)}
                            >
                                <h3 className="font-medium text-lg mb-1">{template.title}</h3>
                                <p className="text-sm text-gray-600">
                                    {template.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">{equationTemplates[selectedTemplate].title}</h2>
                        <button
                            onClick={() => setSelectedTemplate(null)}
                            className="px-4 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Choose Different Scenario
                        </button>
                    </div>

                    {!result ? (
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {equationTemplates[selectedTemplate].fields.map((field) => (
                                    <div key={field.id}>
                                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            id={field.id}
                                            value={inputs[field.id] || ''}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            placeholder={field.placeholder}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Generate Linear Equation
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                                <h3 className="text-lg font-medium mb-4">Your Scenario:</h3>
                                <p className="text-gray-700 mb-6 leading-relaxed">{result.story}</p>

                                <div className="border-t border-gray-200 pt-4">
                                    <h3 className="text-lg font-medium mb-2">Your Linear Equation:</h3>
                                    <div className="py-4 px-6 bg-blue-50 rounded text-center">
                                        <div className="text-2xl font-bold my-2">
                                            {result.equation}
                                        </div>
                                        <div className="mt-2 text-gray-600">
                                            <span className="font-medium">Slope:</span> {result.slope} |
                                            <span className="font-medium ml-2">Y-intercept:</span> {result.yIntercept}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                                <h3 className="text-lg font-medium mb-4">Graph Visualization:</h3>
                                <div className="flex justify-center">
                                    <canvas
                                        id="graph-canvas"
                                        width="600"
                                        height="400"
                                        className="border border-gray-200 rounded"
                                    ></canvas>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                                <h3 className="text-lg font-medium mb-4">Test Your Understanding:</h3>

                                {selectedTemplate === 0 && (
                                    <p className="mb-4">
                                        How much money will {inputs.name} have saved after {result.questionX} weeks?
                                    </p>
                                )}

                                {selectedTemplate === 1 && (
                                    <p className="mb-4">
                                        How far from home will {inputs.traveler} be after {result.questionX} hours?
                                    </p>
                                )}

                                {selectedTemplate === 2 && (
                                    <p className="mb-4">
                                        What is the equivalent of {result.questionX}° {inputs.fromScale} in {inputs.toScale}?
                                    </p>
                                )}

                                <div className="flex items-end gap-4 mb-4">
                                    <div className="flex-grow">
                                        <label htmlFor="user-answer" className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Answer:
                                        </label>
                                        <input
                                            type="number"
                                            id="user-answer"
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            placeholder="Enter your answer"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            step="any"
                                        />
                                    </div>
                                    <button
                                        onClick={handleAnswerSubmit}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Check Answer
                                    </button>
                                </div>

                                {isAnswerCorrect !== null && (
                                    <div className={`p-4 rounded-md ${isAnswerCorrect ? 'bg-green-100' : 'bg-red-100'} mb-4`}>
                                        <p className={`font-medium ${isAnswerCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                            {isAnswerCorrect
                                                ? '✓ Correct! Great job solving the linear equation.'
                                                : '✗ Not quite right. Try using the equation to calculate the answer.'}
                                        </p>
                                    </div>
                                )}

                                {!isAnswerCorrect && (
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setShowSolution(!showSolution)}
                                            className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                        >
                                            {showSolution ? 'Hide Solution' : 'Show Solution'}
                                        </button>
                                    </div>
                                )}

                                {showSolution && (
                                    <div className="mt-4 p-4 bg-blue-50 rounded">
                                        <h4 className="font-medium text-blue-800 mb-2">Solution:</h4>
                                        <p>
                                            Using the equation {result.equation}, we can substitute x = {result.questionX}:
                                        </p>
                                        <p className="my-2 font-medium">
                                            y = {result.slope} × {result.questionX} + {result.yIntercept} = {result.questionAnswerY}
                                        </p>
                                        {selectedTemplate === 0 && (
                                            <p>Therefore, {inputs.name} will have saved ${result.questionAnswerY} after {result.questionX} weeks.</p>
                                        )}
                                        {selectedTemplate === 1 && (
                                            <p>Therefore, {inputs.traveler} will be {result.questionAnswerY} miles from home after {result.questionX} hours.</p>
                                        )}
                                        {selectedTemplate === 2 && (
                                            <p>Therefore, {result.questionX}° {inputs.fromScale} equals {result.questionAnswerY}° {inputs.toScale}.</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-lg font-medium mb-4">Explanation:</h3>
                                <div className="text-gray-700 whitespace-pre-line">
                                    {result.explanation}
                                </div>

                                <div className="flex justify-between mt-6">
                                    <button
                                        onClick={() => {
                                            setResult(null);
                                            setUserAnswer('');
                                            setIsAnswerCorrect(null);
                                            setShowSolution(false);
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Create New Equation
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
} 