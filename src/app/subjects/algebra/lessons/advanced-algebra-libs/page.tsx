'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

// Advanced Algebra story templates with placeholders for user inputs
const storyTemplates = [
    {
        title: "The Farmer's Market",
        complexity: "Multiple Variables",
        fields: [
            { id: "x", label: "Number for Apples", type: "number", placeholder: "Enter price of apples (whole number)" },
            { id: "y", label: "Number for Oranges", type: "number", placeholder: "Enter price of oranges (whole number)" },
            { id: "total1", label: "Total Cost 1", type: "number", placeholder: "Enter a total cost" },
            { id: "total2", label: "Total Cost 2", type: "number", placeholder: "Enter another total cost" },
            { id: "person", label: "Person's Name", type: "text", placeholder: "Enter a name" },
            { id: "store", label: "Store Name", type: "text", placeholder: "Enter a store name" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const x = parseInt(inputs.x); // price of apples
            const y = parseInt(inputs.y); // price of oranges
            const total1 = parseInt(inputs.total1);
            const total2 = parseInt(inputs.total2);

            // Calculate quantities that would result in the given totals
            // Need to solve: 3x + 2y = total1, 2x + 5y = total2
            // Using Cramer's rule or matrix methods
            const determinant = 3 * 5 - 2 * 2;
            const appleQuantity = Math.round((5 * total1 - 2 * total2) / determinant);
            const orangeQuantity = Math.round((3 * total2 - 2 * total1) / determinant);

            return {
                story: `${inputs.person} went to ${inputs.store} to buy some apples and oranges. Apples cost $${x} each and oranges cost $${y} each. 
                On Monday, ${inputs.person} bought 3 apples and 2 oranges, spending $${total1} in total.
                On Tuesday, ${inputs.person} bought 2 apples and 5 oranges, spending $${total2} in total.
                ${inputs.person} wants to figure out exactly how many of each fruit they can buy with $${total1 + total2}.`,
                equations: [
                    "3x + 2y = " + total1,
                    "2x + 5y = " + total2
                ],
                variables: ["x", "y"],
                answers: [appleQuantity, orangeQuantity],
                explanation: `To solve this system of equations:
                     3x + 2y = ${total1}
                     2x + 5y = ${total2}
                     
                     We can use substitution or elimination:
                     
                     Step 1: Multiply the first equation by 2 and the second by 3
                     6x + 4y = ${2 * total1}
                     6x + 15y = ${3 * total2}
                     
                     Step 2: Subtract the first result from the second
                     0x + 11y = ${3 * total2 - 2 * total1}
                     y = ${orangeQuantity}
                     
                     Step 3: Substitute back to find x
                     3x + 2(${orangeQuantity}) = ${total1}
                     3x = ${total1} - ${2 * orangeQuantity}
                     x = ${appleQuantity}
                     
                     Verification:
                     3(${appleQuantity}) + 2(${orangeQuantity}) = ${3 * appleQuantity + 2 * orangeQuantity} ≈ ${total1}
                     2(${appleQuantity}) + 5(${orangeQuantity}) = ${2 * appleQuantity + 5 * orangeQuantity} ≈ ${total2}
                     
                     Therefore, the quantities are:
                     Apples (x) = ${appleQuantity}
                     Oranges (y) = ${orangeQuantity}`
            };
        }
    },
    {
        title: "The Science Experiment",
        complexity: "Quadratic Equation",
        fields: [
            { id: "a", label: "Coefficient a", type: "number", placeholder: "Enter coefficient a (1-5)" },
            { id: "b", label: "Coefficient b", type: "number", placeholder: "Enter coefficient b (1-10)" },
            { id: "c", label: "Coefficient c", type: "number", placeholder: "Enter coefficient c (1-20)" },
            { id: "scientist", label: "Scientist Name", type: "text", placeholder: "Enter a scientist name" },
            { id: "substance", label: "Substance", type: "text", placeholder: "Enter a substance name" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const a = parseInt(inputs.a);
            const b = parseInt(inputs.b);
            const c = parseInt(inputs.c);

            // Calculate the solutions using the quadratic formula
            const discriminant = b * b - 4 * a * c;
            let solution1: number | string;
            let solution2: number | string;

            if (discriminant >= 0) {
                solution1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                solution2 = (-b - Math.sqrt(discriminant)) / (2 * a);
                solution1 = Math.round(solution1 * 100) / 100;
                solution2 = Math.round(solution2 * 100) / 100;
            } else {
                // For imaginary solutions, we'll create a different scenario
                const realPart = -b / (2 * a);
                const imagPart = Math.sqrt(-discriminant) / (2 * a);
                const roundedReal = Math.round(realPart * 100) / 100;
                const roundedImag = Math.round(imagPart * 100) / 100;
                solution1 = `${roundedReal} + ${roundedImag}i`;
                solution2 = `${roundedReal} - ${roundedImag}i`;
            }

            return {
                story: `Dr. ${inputs.scientist} is conducting an experiment with ${inputs.substance}. 
                The reaction follows a quadratic model where ${a}x² + ${b}x + ${c} = 0, 
                where x represents the optimal temperature for the reaction.
                Dr. ${inputs.scientist} needs to find all possible values of x to complete the experiment.`,
                equations: [`${a}x² + ${b}x + ${c} = 0`],
                variables: ["x"],
                answers: discriminant >= 0 ? [solution1, solution2] : ["Complex solutions"],
                explanation: discriminant >= 0
                    ? `To solve the quadratic equation ${a}x² + ${b}x + ${c} = 0, we use the quadratic formula:
             
             x = (-b ± √(b² - 4ac)) / (2a)
             
             Step 1: Calculate the discriminant
             b² - 4ac = ${b}² - 4(${a})(${c}) = ${b * b} - ${4 * a * c} = ${discriminant}
             
             Step 2: Since the discriminant (${discriminant}) is ≥ 0, we have real solutions.
             
             Step 3: Apply the quadratic formula
             x = (-${b} ± √${discriminant}) / (2 · ${a})
             
             For the first solution:
             x₁ = (-${b} + √${discriminant}) / ${2 * a}
             x₁ = (${-b} + ${Math.sqrt(discriminant).toFixed(4)}) / ${2 * a}
             x₁ = ${(-b + Math.sqrt(discriminant)).toFixed(4)} / ${2 * a}
             x₁ = ${solution1}
             
             For the second solution:
             x₂ = (-${b} - √${discriminant}) / ${2 * a}
             x₂ = (${-b} - ${Math.sqrt(discriminant).toFixed(4)}) / ${2 * a}
             x₂ = ${(-b - Math.sqrt(discriminant)).toFixed(4)} / ${2 * a}
             x₂ = ${solution2}
             
             Verification:
             Let's substitute x = ${solution1} back into the original equation:
             ${a}(${solution1})² + ${b}(${solution1}) + ${c}
             = ${(a * Math.pow(typeof solution1 === 'number' ? solution1 : 0, 2)).toFixed(4)} + ${(b * (typeof solution1 === 'number' ? solution1 : 0)).toFixed(4)} + ${c}
             = ${(a * Math.pow(typeof solution1 === 'number' ? solution1 : 0, 2) + b * (typeof solution1 === 'number' ? solution1 : 0) + c).toFixed(4)} ≈ 0 ✓`
                    : `To solve the quadratic equation ${a}x² + ${b}x + ${c} = 0, we use the quadratic formula:
             
             x = (-b ± √(b² - 4ac)) / (2a)
             
             Step 1: Calculate the discriminant
             b² - 4ac = ${b}² - 4(${a})(${c}) = ${b * b} - ${4 * a * c} = ${discriminant}
             
             Step 2: Since the discriminant (${discriminant}) is negative, we have complex solutions.
             
             Step 3: Apply the quadratic formula with complex numbers
             x = (-${b} ± √(${discriminant})) / (2 · ${a})
             
             We can rewrite √(${discriminant}) as √(${-discriminant}) · i, where i is the imaginary unit.
             
             Step 4: Calculate the real and imaginary parts
             Real part = -${b} / (2 · ${a}) = ${-b} / ${2 * a} = ${-b / (2 * a)}
             Imaginary part = √(${-discriminant}) / (2 · ${a}) = ${Math.sqrt(-discriminant).toFixed(4)} / ${2 * a} = ${(Math.sqrt(-discriminant) / (2 * a)).toFixed(4)}
             
             Step 5: Write the complex solutions
             x₁ = ${solution1}
             x₂ = ${solution2}
             
             This means Dr. ${inputs.scientist}'s experiment has no real temperature solutions,
             indicating that the reaction may not be physically possible under the given conditions.`
            };
        }
    },
    {
        title: "The Financial Planner",
        complexity: "System with Three Variables",
        fields: [
            { id: "r1", label: "Interest Rate 1", type: "number", placeholder: "Enter interest rate (e.g., 3 for 3%)" },
            { id: "r2", label: "Interest Rate 2", type: "number", placeholder: "Enter interest rate (e.g., 5 for 5%)" },
            { id: "r3", label: "Interest Rate 3", type: "number", placeholder: "Enter interest rate (e.g., 7 for 7%)" },
            { id: "total", label: "Total Investment", type: "number", placeholder: "Enter total investment amount" },
            { id: "income", label: "Annual Income", type: "number", placeholder: "Enter desired annual income" },
            { id: "person", label: "Person's Name", type: "text", placeholder: "Enter a name" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const r1 = parseInt(inputs.r1) / 100; // Convert to decimal
            const r2 = parseInt(inputs.r2) / 100;
            const r3 = parseInt(inputs.r3) / 100;
            const total = parseInt(inputs.total);
            const income = parseInt(inputs.income);

            // Properly solve the system of equations:
            // x + y + z = total
            // r1*x + r2*y + r3*z = income
            // x = y + 2000

            // Substitute x = y + 2000 into first equation
            // (y + 2000) + y + z = total
            // 2y + z = total - 2000

            // Solve for z in terms of y
            // z = total - 2000 - 2y

            // Substitute into second equation
            // r1*(y + 2000) + r2*y + r3*(total - 2000 - 2y) = income
            // r1*y + 2000*r1 + r2*y + r3*total - 2000*r3 - 2*r3*y = income
            // (r1 + r2 - 2*r3)*y = income - 2000*r1 - r3*total + 2000*r3

            // Solve for y
            const y = Math.round((income - 2000 * r1 - r3 * total + 2000 * r3) / (r1 + r2 - 2 * r3));
            const x = y + 2000;
            const z = total - x - y;

            // Verify the solutions meet the constraints
            const actualIncome = r1 * x + r2 * y + r3 * z;

            return {
                story: `${inputs.person} has $${total} to invest across three different accounts. 
                The first account yields ${inputs.r1}% annual interest, the second account yields ${inputs.r2}% interest, 
                and the third account yields ${inputs.r3}% interest. ${inputs.person} wants to earn $${income} in annual interest,
                and wants to invest $2,000 more in the first account than in the second account.
                How much should ${inputs.person} invest in each account?`,
                equations: [
                    "x + y + z = " + total,
                    `${r1}x + ${r2}y + ${r3}z = ` + income,
                    "x = y + 2000"
                ],
                variables: ["x", "y", "z"],
                answers: [x, y, z],
                explanation: `To solve this system of equations:
                     x + y + z = ${total} ... (1)
                     ${r1}x + ${r2}y + ${r3}z = ${income} ... (2)
                     x = y + 2000 ... (3)
                     
                     Step 1: Substitute equation (3) into equation (1)
                     (y + 2000) + y + z = ${total}
                     2y + z = ${total - 2000} ... (4)
                     
                     Step 2: Solve for z using equation (4)
                     z = ${total - 2000} - 2y ... (5)
                     
                     Step 3: Substitute equations (3) and (5) into equation (2)
                     ${r1}(y + 2000) + ${r2}y + ${r3}(${total - 2000} - 2y) = ${income}
                     ${r1}y + ${r1 * 2000} + ${r2}y + ${r3 * (total - 2000)} - ${r3 * 2}y = ${income}
                     ${r1}y + ${r2}y - ${r3 * 2}y = ${income} - ${r1 * 2000} - ${r3 * (total - 2000)}
                     (${r1} + ${r2} - ${r3 * 2})y = ${income - r1 * 2000 - r3 * (total - 2000)}
                     y = ${y}
                     
                     Step 4: Substitute y back to find x and z
                     x = y + 2000 = ${y} + 2000 = ${x}
                     z = ${total - 2000} - 2y = ${total - 2000} - 2(${y}) = ${z}
                     
                     Therefore:
                     First account (x): $${x}
                     Second account (y): $${y}
                     Third account (z): $${z}
                     
                     Verification:
                     x + y + z = ${x} + ${y} + ${z} = ${x + y + z} = $${total} ✓
                     ${r1}x + ${r2}y + ${r3}z = ${(r1 * x).toFixed(2)} + ${(r2 * y).toFixed(2)} + ${(r3 * z).toFixed(2)} = ${actualIncome.toFixed(2)} ≈ $${income} ✓
                     x = ${x} = ${y} + 2000 = ${y + 2000} ✓`
            };
        }
    }
];

export default function AdvancedAlgebraLibs() {
    const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [story, setStory] = useState<string | null>(null);
    const [equations, setEquations] = useState<string[] | null>(null);
    const [variables, setVariables] = useState<string[] | null>(null);
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [correctAnswers, setCorrectAnswers] = useState<(number | string | null)[] | null>(null);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleTemplateSelect = (index: number) => {
        setSelectedTemplate(index);
        setInputs({});
        setStory(null);
        setEquations(null);
        setVariables(null);
        setUserAnswers({});
        setCorrectAnswers(null);
        setExplanation(null);
        setShowAnswer(false);
        setIsCorrect(null);
    };

    const handleInputChange = (id: string, value: string) => {
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const handleUserAnswerChange = (variable: string, value: string) => {
        setUserAnswers(prev => ({ ...prev, [variable]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (selectedTemplate === null) return;

        const template = storyTemplates[selectedTemplate];
        const result = template.generateStory(inputs);

        setStory(result.story);
        setEquations(result.equations);
        setVariables(result.variables);
        setCorrectAnswers(result.answers);
        setExplanation(result.explanation);
        setShowAnswer(false);
        setIsCorrect(null);

        // Initialize user answers
        const initialAnswers: Record<string, string> = {};
        result.variables.forEach(variable => {
            initialAnswers[variable] = '';
        });
        setUserAnswers(initialAnswers);
    };

    const checkAnswers = () => {
        if (correctAnswers === null || variables === null) return;

        // For problems with multiple answers (like quadratic equations)
        if (correctAnswers.length > variables.length) {
            // This handles quadratic equations with 2 solutions
            const userAnsNum = parseFloat(userAnswers[variables[0]]);

            // Check if the user's answer matches either solution
            setIsCorrect(
                correctAnswers.some(ans =>
                    typeof ans === 'number' && Math.abs(userAnsNum - ans) < 0.1
                )
            );
        } else {
            // For systems of equations with multiple variables
            let allCorrect = true;

            variables.forEach((variable, index) => {
                const userAnsNum = parseFloat(userAnswers[variable]);
                const correctAns = correctAnswers[index];

                if (typeof correctAns === 'number') {
                    if (Math.abs(userAnsNum - correctAns) >= 0.1) {
                        allCorrect = false;
                    }
                } else if (userAnswers[variable] !== correctAns) {
                    allCorrect = false;
                }
            });

            setIsCorrect(allCorrect);
        }

        setShowAnswer(true);
    };

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
                <h1 className="text-3xl font-bold text-blue-800">Advanced Algebra-Libs</h1>
                <p className="text-gray-600 mt-2">
                    Create complex algebra stories with multiple variables and systems of equations.
                </p>
                <div className="flex justify-center mt-2">
                    <div className="inline-flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-gray-300">☆</span>
                        <span className="ml-2 text-gray-600 text-sm">Difficulty: Advanced</span>
                    </div>
                </div>
            </div>

            {selectedTemplate === null ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Choose a Story Template:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {storyTemplates.map((template, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition-colors"
                                onClick={() => handleTemplateSelect(index)}
                            >
                                <h3 className="font-medium text-lg mb-1">{template.title}</h3>
                                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-2">
                                    {template.complexity}
                                </span>
                                <p className="text-sm text-gray-600">
                                    Create a story about {template.title.toLowerCase()} and solve the equations.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">{storyTemplates[selectedTemplate].title}</h2>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {storyTemplates[selectedTemplate].complexity}
                        </span>
                    </div>

                    {!story ? (
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {storyTemplates[selectedTemplate].fields.map((field) => (
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
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setSelectedTemplate(null)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Choose Different Template
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Generate Story
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                                <h3 className="text-lg font-medium mb-4">Your Story:</h3>
                                <p className="text-gray-700 mb-6 leading-relaxed">{story}</p>

                                <div className="border-t border-gray-200 pt-4">
                                    <h3 className="text-lg font-medium mb-2">Equations to Solve:</h3>
                                    <div className="py-4 px-6 bg-blue-50 rounded">
                                        {equations?.map((equation, index) => (
                                            <div key={index} className="text-xl font-bold text-center my-2">
                                                {equation}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-lg font-medium mb-4">Your Solution:</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {variables?.map((variable, index) => (
                                        <div key={index}>
                                            <label htmlFor={`answer-${variable}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                {variable} =
                                            </label>
                                            <input
                                                type="text"
                                                id={`answer-${variable}`}
                                                value={userAnswers[variable] || ''}
                                                onChange={(e) => handleUserAnswerChange(variable, e.target.value)}
                                                placeholder={`Enter value for ${variable}`}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-center mb-4">
                                    <button
                                        onClick={checkAnswers}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Check Answers
                                    </button>
                                </div>

                                {isCorrect !== null && (
                                    <div className={`p-4 rounded-md ${isCorrect ? 'bg-green-100' : 'bg-red-100'} mb-4`}>
                                        <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                            {isCorrect
                                                ? '✓ Excellent work! Your solution is correct.'
                                                : '✗ Not quite right. Try again or check the solution for guidance.'}
                                        </p>
                                    </div>
                                )}

                                {showAnswer && (
                                    <div className="mt-4 p-4 bg-blue-50 rounded-md">
                                        <h4 className="font-medium text-blue-800 mb-2">Solution:</h4>

                                        <div className="mb-4">
                                            {variables?.map((variable, index) => {
                                                const answer = correctAnswers?.[index];
                                                return (
                                                    <p key={index} className="mb-1">
                                                        <span className="font-medium">{variable} = </span>
                                                        <span>{answer}</span>
                                                    </p>
                                                );
                                            })}

                                            {/* Special case for quadratic equations with 2 solutions but 1 variable */}
                                            {variables?.length === 1 && correctAnswers && correctAnswers.length > 1 && (
                                                <p className="mt-2 text-gray-700">
                                                    {typeof correctAnswers[0] === 'string'
                                                        ? correctAnswers[0]
                                                        : `This equation has two solutions: ${correctAnswers[0]} and ${correctAnswers[1]}`}
                                                </p>
                                            )}
                                        </div>

                                        <div className="border-t border-blue-200 pt-3 mt-3">
                                            <h5 className="font-medium text-blue-800 mb-2">Step-by-Step Explanation:</h5>
                                            <div className="whitespace-pre-line text-gray-700 text-sm">
                                                {explanation}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between mt-6">
                                    <button
                                        onClick={() => {
                                            setStory(null);
                                            setEquations(null);
                                            setVariables(null);
                                            setUserAnswers({});
                                            setCorrectAnswers(null);
                                            setExplanation(null);
                                            setShowAnswer(false);
                                            setIsCorrect(null);
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Create New Story
                                    </button>

                                    {!showAnswer && (
                                        <button
                                            onClick={() => setShowAnswer(true)}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                        >
                                            Show Solution
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
} 