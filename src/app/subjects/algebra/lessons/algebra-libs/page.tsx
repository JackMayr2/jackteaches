'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

// Define the types of input fields we need for the algebra libs
type InputField = {
    id: string;
    label: string;
    type: 'number' | 'text';
    placeholder: string;
};

// Algebra story templates with placeholders for user inputs
const storyTemplates = [
    {
        title: "Algebra Overview: Addition & Subtraction",
        fields: [
            { id: "name", label: "Student's Name", type: "text", placeholder: "Enter a student's name" },
            { id: "teacher", label: "Teacher's Name", type: "text", placeholder: "Enter a teacher's name" },
            { id: "num1", label: "Number 1 (small)", type: "number", placeholder: "Enter a small number (1-10)" },
            { id: "num2", label: "Number 2 (larger)", type: "number", placeholder: "Enter a larger number (10-50)" },
            { id: "subject", label: "Favorite Subject", type: "text", placeholder: "Enter a school subject" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const num1 = parseInt(inputs.num1);
            const num2 = parseInt(inputs.num2);

            // Create two example problems for the lesson overview
            const add_answer = num2 - num1; // x + num1 = num2
            const subtract_answer = num2 + num1; // x - num1 = num2

            return {
                story: `Welcome to One-Variable Algebra with ${inputs.teacher}!

                Today, ${inputs.name} is learning about solving equations with one variable. The variable 'x' represents an unknown number that we need to find.
                
                In one-variable algebra, we isolate the variable (get 'x' by itself) by performing the same operation to both sides of the equation.
                
                For addition problems like 'x + ${num1} = ${num2}', we subtract ${num1} from both sides.
                For subtraction problems like 'x - ${num1} = ${num2}', we add ${num1} to both sides.
                
                ${inputs.name} will practice with the equation: x + ${num1} = ${num2}
                
                What is the value of x?`,
                equation: `x + ${num1} = ${num2}`,
                answer: add_answer,
                explanation: `Let's solve for x in the equation:
                
                x + ${num1} = ${num2}
                
                Step 1: To isolate x, we need to remove the ${num1} from the left side.
                Subtract ${num1} from both sides of the equation:
                x + ${num1} - ${num1} = ${num2} - ${num1}
                
                Step 2: Simplify both sides:
                x = ${num2 - num1}
                
                Therefore, x = ${add_answer}
                
                We can verify this answer by substituting it back into the original equation:
                ${add_answer} + ${num1} = ${add_answer + num1} ✓
                
                Another example would be: x - ${num1} = ${num2}
                For this equation, we would add ${num1} to both sides:
                x - ${num1} + ${num1} = ${num2} + ${num1}
                x = ${num2 + num1}
                
                The key principle in algebra is to perform the same operation to both sides of the equation to maintain equality while isolating the variable.`
            };
        }
    },
    {
        title: "Simple Addition Problem",
        fields: [
            { id: "a", label: "Number A", type: "number", placeholder: "Enter a number" },
            { id: "b", label: "Number B", type: "number", placeholder: "Enter another number" },
            { id: "person", label: "Person's Name", type: "text", placeholder: "Enter a name" },
            { id: "object", label: "Object", type: "text", placeholder: "Enter an object" },
            { id: "event", label: "Event", type: "text", placeholder: "Enter an event" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const a = parseInt(inputs.a);
            const b = parseInt(inputs.b);

            // The equation is x + a = b, so x = b - a
            const answer = b - a;

            return {
                story: `${inputs.person} was preparing for ${inputs.event} and needed to count ${inputs.object}s.
                ${inputs.person} already had ${a} ${inputs.object}s and received more, bringing the total to ${b} ${inputs.object}s.
                How many additional ${inputs.object}s did ${inputs.person} receive?`,
                equation: `x + ${a} = ${b}`,
                answer: answer,
                explanation: `To find how many additional ${inputs.object}s ${inputs.person} received, we need to solve for x in the equation:
                
                x + ${a} = ${b}
                
                Step 1: Subtract ${a} from both sides of the equation.
                x + ${a} - ${a} = ${b} - ${a}
                x = ${b - a}
                
                Therefore, ${inputs.person} received ${answer} additional ${inputs.object}s.`
            };
        }
    },
    {
        title: "The Missing Number",
        fields: [
            { id: "a", label: "Number A", type: "number", placeholder: "Enter a number" },
            { id: "b", label: "Number B", type: "number", placeholder: "Enter another number" },
            { id: "item", label: "Noun (singular)", type: "text", placeholder: "Enter a noun (e.g., apple)" },
            { id: "place", label: "Place", type: "text", placeholder: "Enter a place" },
            { id: "person", label: "Person's Name", type: "text", placeholder: "Enter a name" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const a = parseInt(inputs.a);
            const b = parseInt(inputs.b);

            // The equation will be: x + a = b, so x = b - a
            const answer = b - a;

            return {
                story: `${inputs.person} was at the ${inputs.place} counting their collection of ${inputs.item}s.
                They knew they had ${b} ${inputs.item}s in total. 
                ${inputs.person} counted ${a} ${inputs.item}s on the shelf, but couldn't remember how many were in the box.
                How many ${inputs.item}s are in the box?`,
                equation: `x + ${a} = ${b}`,
                answer: answer,
                explanation: `To find the unknown number of ${inputs.item}s in the box, we need to solve for x in the equation:
                
                x + ${a} = ${b}
                
                Step 1: Subtract ${a} from both sides of the equation.
                x + ${a} - ${a} = ${b} - ${a}
                x = ${b - a}
                
                Therefore, there are ${answer} ${inputs.item}s in the box.`
            };
        }
    },
    {
        title: "Simple Subtraction Problem",
        fields: [
            { id: "a", label: "Number A", type: "number", placeholder: "Enter a number" },
            { id: "b", label: "Number B", type: "number", placeholder: "Enter another number" },
            { id: "person", label: "Person's Name", type: "text", placeholder: "Enter a name" },
            { id: "item", label: "Item", type: "text", placeholder: "Enter an item" },
            { id: "activity", label: "Activity", type: "text", placeholder: "Enter an activity" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const a = parseInt(inputs.a);
            const b = parseInt(inputs.b);

            // The equation is x - a = b, so x = b + a
            const answer = b + a;

            return {
                story: `${inputs.person} was ${inputs.activity} and started with some ${inputs.item}s.
                After giving away ${a} ${inputs.item}s, ${inputs.person} had ${b} ${inputs.item}s left.
                How many ${inputs.item}s did ${inputs.person} have at the beginning?`,
                equation: `x - ${a} = ${b}`,
                answer: answer,
                explanation: `To find how many ${inputs.item}s ${inputs.person} had at the beginning, we need to solve for x in the equation:
                
                x - ${a} = ${b}
                
                Step 1: Add ${a} to both sides of the equation.
                x - ${a} + ${a} = ${b} + ${a}
                x = ${b + a}
                
                Therefore, ${inputs.person} had ${answer} ${inputs.item}s at the beginning.`
            };
        }
    },
    {
        title: "Before and After",
        fields: [
            { id: "a", label: "Number A", type: "number", placeholder: "Enter a number" },
            { id: "b", label: "Number B", type: "number", placeholder: "Enter another number" },
            { id: "item", label: "Noun (plural)", type: "text", placeholder: "Enter a plural noun (e.g., marbles)" },
            { id: "action", label: "Action", type: "text", placeholder: "Enter an action (e.g., gave away, found)" },
            { id: "person", label: "Person's Name", type: "text", placeholder: "Enter a name" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const a = parseInt(inputs.a);
            const b = parseInt(inputs.b);

            // The equation will be: x - a = b, so x = b + a
            const answer = b + a;

            return {
                story: `${inputs.person} had a collection of ${inputs.item}. Yesterday, ${inputs.person} ${inputs.action} ${a} of the ${inputs.item}.
                After this, ${inputs.person} counted and found that ${b} ${inputs.item} remained.
                How many ${inputs.item} did ${inputs.person} have originally?`,
                equation: `x - ${a} = ${b}`,
                answer: answer,
                explanation: `To find the original number of ${inputs.item}, we need to solve for x in the equation:
                
                x - ${a} = ${b}
                
                Step 1: Add ${a} to both sides of the equation.
                x - ${a} + ${a} = ${b} + ${a}
                x = ${b + a}
                
                Therefore, ${inputs.person} originally had ${answer} ${inputs.item}.`
            };
        }
    },
    {
        title: "Mystery Multiplier",
        fields: [
            { id: "a", label: "Number A", type: "number", placeholder: "Enter a number" },
            { id: "b", label: "Number B", type: "number", placeholder: "Enter another number" },
            { id: "subject", label: "School Subject", type: "text", placeholder: "Enter a school subject" },
            { id: "teacher", label: "Teacher's Name", type: "text", placeholder: "Enter a teacher's name" },
            { id: "student", label: "Student's Name", type: "text", placeholder: "Enter a student's name" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const a = parseInt(inputs.a);
            const b = parseInt(inputs.b);

            // The equation will be: a * x = b, so x = b / a
            const answer = b / a;

            return {
                story: `In ${inputs.teacher}'s ${inputs.subject} class, students were solving a number puzzle.
                ${inputs.teacher} wrote the equation on the board where some number multiplied by ${a} equals ${b}.
                ${inputs.student} was trying to figure out what this mystery number could be.
                What is the value of the mystery number?`,
                equation: `${a}x = ${b}`,
                answer: answer,
                explanation: `To find the mystery number, we need to solve for x in the equation:
                
                ${a}x = ${b}
                
                Step 1: Divide both sides of the equation by ${a}.
                ${a}x ÷ ${a} = ${b} ÷ ${a}
                x = ${b / a}
                
                Therefore, the mystery number is ${answer}.`
            };
        }
    },
    {
        title: "Addition with Like Terms",
        fields: [
            { id: "a", label: "Number A", type: "number", placeholder: "Enter a number" },
            { id: "b", label: "Number B", type: "number", placeholder: "Enter another number" },
            { id: "c", label: "Number C", type: "number", placeholder: "Enter a third number" },
            { id: "character", label: "Character's Name", type: "text", placeholder: "Enter a name" },
            { id: "subject", label: "School Subject", type: "text", placeholder: "Enter a school subject" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const a = parseInt(inputs.a);
            const b = parseInt(inputs.b);
            const c = parseInt(inputs.c);

            // The equation is ax + b = c, so x = (c - b) / a
            const answer = (c - b) / a;

            return {
                story: `During a ${inputs.subject} class, ${inputs.character} was given a problem to solve.
                The problem stated that when ${a} times some number plus ${b} equals ${c}, what is the number?
                ${inputs.character} needs to find this number to complete the assignment.
                What is the value of the number?`,
                equation: `${a}x + ${b} = ${c}`,
                answer: answer,
                explanation: `To find the value of the number, we need to solve for x in the equation:
                
                ${a}x + ${b} = ${c}
                
                Step 1: Subtract ${b} from both sides of the equation.
                ${a}x + ${b} - ${b} = ${c} - ${b}
                ${a}x = ${c - b}
                
                Step 2: Divide both sides by ${a}.
                ${a}x ÷ ${a} = ${c - b} ÷ ${a}
                x = ${(c - b) / a}
                
                Therefore, the value of the number is ${answer}.`
            };
        }
    },
    {
        title: "Balancing Act",
        fields: [
            { id: "a", label: "Number A", type: "number", placeholder: "Enter a number" },
            { id: "b", label: "Number B", type: "number", placeholder: "Enter another number" },
            { id: "c", label: "Number C", type: "number", placeholder: "Enter a third number" },
            { id: "person", label: "Person's Name", type: "text", placeholder: "Enter a name" },
            { id: "object", label: "Object", type: "text", placeholder: "Enter an object" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const a = parseInt(inputs.a);
            const b = parseInt(inputs.b);
            const c = parseInt(inputs.c);

            // The equation will be: ax + b = c, so x = (c - b) / a
            const answer = (c - b) / a;

            return {
                story: `${inputs.person} was solving a puzzle involving a ${inputs.object}.
                The puzzle stated that when ${a} times an unknown number is added to ${b}, the result is ${c}.
                ${inputs.person} needs to find this unknown number to unlock the ${inputs.object}.
                What is the unknown number?`,
                equation: `${a}x + ${b} = ${c}`,
                answer: answer,
                explanation: `To find the unknown number, we need to solve for x in the equation:
                
                ${a}x + ${b} = ${c}
                
                Step 1: Subtract ${b} from both sides of the equation.
                ${a}x + ${b} - ${b} = ${c} - ${b}
                ${a}x = ${c - b}
                
                Step 2: Divide both sides by ${a}.
                ${a}x ÷ ${a} = ${c - b} ÷ ${a}
                x = ${(c - b) / a}
                
                Therefore, the unknown number is ${answer}.`
            };
        }
    },
    {
        title: "Two-Step Transformation",
        fields: [
            { id: "a", label: "Number A", type: "number", placeholder: "Enter a number" },
            { id: "b", label: "Number B", type: "number", placeholder: "Enter another number" },
            { id: "c", label: "Number C", type: "number", placeholder: "Enter a third number" },
            { id: "person", label: "Person's Name", type: "text", placeholder: "Enter a name" },
            { id: "activity", label: "Activity", type: "text", placeholder: "Enter an activity (e.g., baking)" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const a = parseInt(inputs.a);
            const b = parseInt(inputs.b);
            const c = parseInt(inputs.c);

            // The equation will be: ax - b = c, so x = (c + b) / a
            const answer = (c + b) / a;

            return {
                story: `${inputs.person} was ${inputs.activity} and needed to follow a special formula.
                The formula states that when ${a} times a secret number, minus ${b}, equals ${c}, 
                the recipe will turn out perfectly.
                What is the secret number that ${inputs.person} needs to use?`,
                equation: `${a}x - ${b} = ${c}`,
                answer: answer,
                explanation: `To find the secret number, we need to solve for x in the equation:
                
                ${a}x - ${b} = ${c}
                
                Step 1: Add ${b} to both sides of the equation.
                ${a}x - ${b} + ${b} = ${c} + ${b}
                ${a}x = ${c + b}
                
                Step 2: Divide both sides by ${a}.
                ${a}x ÷ ${a} = ${c + b} ÷ ${a}
                x = ${(c + b) / a}
                
                Therefore, the secret number is ${answer}.`
            };
        }
    },
    {
        title: "Distance Riddle",
        fields: [
            { id: "a", label: "Number A", type: "number", placeholder: "Enter a number" },
            { id: "b", label: "Number B", type: "number", placeholder: "Enter another number" },
            { id: "location1", label: "First Location", type: "text", placeholder: "Enter a location" },
            { id: "location2", label: "Second Location", type: "text", placeholder: "Enter another location" },
            { id: "traveler", label: "Traveler's Name", type: "text", placeholder: "Enter a name" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const a = parseInt(inputs.a);
            const b = parseInt(inputs.b);

            // The equation is 2x + a = x + b, so x = b - a
            const answer = b - a;

            return {
                story: `${inputs.traveler} is trying to solve a riddle about distances between ${inputs.location1} and ${inputs.location2}.
                The riddle states that twice the unknown distance plus ${a} miles equals the unknown distance plus ${b} miles.
                ${inputs.traveler} needs to determine this unknown distance to complete their journey.
                What is the unknown distance in miles?`,
                equation: `2x + ${a} = x + ${b}`,
                answer: answer,
                explanation: `To find the unknown distance, we need to solve for x in the equation:
                
                2x + ${a} = x + ${b}
                
                Step 1: Subtract x from both sides to get all x terms on one side.
                2x + ${a} - x = x + ${b} - x
                x + ${a} = ${b}
                
                Step 2: Subtract ${a} from both sides.
                x + ${a} - ${a} = ${b} - ${a}
                x = ${b - a}
                
                Therefore, the unknown distance is ${answer} miles.`
            };
        }
    },
    {
        title: "Variable on Both Sides",
        fields: [
            { id: "a", label: "Number A", type: "number", placeholder: "Enter a number" },
            { id: "b", label: "Number B", type: "number", placeholder: "Enter another number" },
            { id: "c", label: "Number C", type: "number", placeholder: "Enter a third number" },
            { id: "d", label: "Number D", type: "number", placeholder: "Enter a fourth number" },
            { id: "game", label: "Game Name", type: "text", placeholder: "Enter a game name" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const a = parseInt(inputs.a);
            const b = parseInt(inputs.b);
            const c = parseInt(inputs.c);
            const d = parseInt(inputs.d);

            // The equation will be: ax + b = cx + d
            // Rearranging: ax - cx = d - b
            // (a-c)x = d - b
            // x = (d - b) / (a - c)
            const answer = (d - b) / (a - c);

            return {
                story: `In the popular game ${inputs.game}, players need to solve balance equations to advance.
                A challenging level has appeared where ${a} times an unknown value plus ${b} equals ${c} times the unknown value plus ${d}.
                To proceed to the next level, the player needs to determine the unknown value.
                What is the value that balances this equation?`,
                equation: `${a}x + ${b} = ${c}x + ${d}`,
                answer: answer,
                explanation: `To find the unknown value, we need to solve for x in the equation:
                
                ${a}x + ${b} = ${c}x + ${d}
                
                Step 1: Subtract ${c}x from both sides to get all terms with x on one side.
                ${a}x + ${b} - ${c}x = ${c}x + ${d} - ${c}x
                ${a - c}x + ${b} = ${d}
                
                Step 2: Subtract ${b} from both sides.
                ${a - c}x + ${b} - ${b} = ${d} - ${b}
                ${a - c}x = ${d - b}
                
                Step 3: Divide both sides by ${a - c}.
                ${a - c}x ÷ ${a - c} = ${d - b} ÷ ${a - c}
                x = ${(d - b) / (a - c)}
                
                Therefore, the unknown value is ${answer}.`
            };
        }
    },
    {
        title: "Fraction Challenge",
        fields: [
            { id: "a", label: "Number A", type: "number", placeholder: "Enter a number" },
            { id: "b", label: "Number B", type: "number", placeholder: "Enter another number" },
            { id: "c", label: "Number C", type: "number", placeholder: "Enter a third number" },
            { id: "character", label: "Character Name", type: "text", placeholder: "Enter a character name" },
            { id: "prize", label: "Prize", type: "text", placeholder: "Enter a prize" },
        ],
        generateStory: (inputs: Record<string, string>) => {
            const a = parseInt(inputs.a);
            const b = parseInt(inputs.b);
            const c = parseInt(inputs.c);

            // The equation will be: x/a = b/c, so x = (a*b)/c
            const answer = (a * b) / c;

            return {
                story: `${inputs.character} participated in a math competition where solving proportions could win a ${inputs.prize}.
                The final question asked: If the ratio of the unknown number to ${a} is the same as the ratio of ${b} to ${c},
                what is the unknown number?
                Can ${inputs.character} solve this proportion to win the ${inputs.prize}?`,
                equation: `x/${a} = ${b}/${c}`,
                answer: answer,
                explanation: `To find the unknown number, we need to solve the proportion:
                
                x/${a} = ${b}/${c}
                
                Step 1: Cross multiply to eliminate the fractions.
                x × ${c} = ${a} × ${b}
                ${c}x = ${a * b}
                
                Step 2: Divide both sides by ${c}.
                ${c}x ÷ ${c} = ${a * b} ÷ ${c}
                x = ${(a * b) / c}
                
                Therefore, the unknown number is ${answer}, and ${inputs.character} can win the ${inputs.prize}!`
            };
        }
    }
];

export default function AlgebraLibs() {
    const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [story, setStory] = useState<string | null>(null);
    const [equation, setEquation] = useState<string | null>(null);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleTemplateSelect = (index: number) => {
        setSelectedTemplate(index);
        setInputs({});
        setStory(null);
        setEquation(null);
        setUserAnswer('');
        setCorrectAnswer(null);
        setExplanation(null);
        setShowAnswer(false);
        setIsCorrect(null);
    };

    const handleInputChange = (id: string, value: string) => {
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (selectedTemplate === null) return;

        const template = storyTemplates[selectedTemplate];
        const result = template.generateStory(inputs);

        setStory(result.story);
        setEquation(result.equation);
        setCorrectAnswer(result.answer);
        setExplanation(result.explanation);
        setShowAnswer(false);
        setIsCorrect(null);
    };

    const checkAnswer = () => {
        if (correctAnswer === null) return;

        const numericAnswer = parseFloat(userAnswer);
        setIsCorrect(numericAnswer === correctAnswer);
        setShowAnswer(true);
    };

    // Function to fill form with default example values based on the selected template
    const fillWithExampleValues = () => {
        if (selectedTemplate === null) return;

        const defaultValues: Record<string, Record<string, string>> = {
            // Algebra Overview
            0: {
                name: "Alex",
                teacher: "Ms. Johnson",
                num1: "5",
                num2: "25",
                subject: "Math"
            },
            // Simple Addition Problem
            1: {
                a: "12",
                b: "30",
                person: "Jamie",
                object: "balloon",
                event: "birthday party"
            },
            // The Missing Number
            2: {
                a: "8",
                b: "15",
                item: "book",
                place: "library",
                person: "Taylor"
            },
            // Simple Subtraction Problem
            3: {
                a: "7",
                b: "14",
                person: "Casey",
                item: "cookie",
                activity: "baking"
            },
            // Before and After
            4: {
                a: "9",
                b: "17",
                item: "stamps",
                action: "gave away",
                person: "Jordan"
            },
            // Mystery Multiplier
            5: {
                a: "4",
                b: "20",
                subject: "Science",
                teacher: "Mr. Wilson",
                student: "Riley"
            },
            // Addition with Like Terms
            6: {
                a: "3",
                b: "5",
                c: "20",
                character: "Morgan",
                subject: "Algebra"
            },
            // Balancing Act
            7: {
                a: "2",
                b: "6",
                c: "16",
                person: "Sam",
                object: "treasure chest"
            },
            // Two-Step Transformation
            8: {
                a: "3",
                b: "4",
                c: "11",
                person: "Avery",
                activity: "cooking"
            },
            // Distance Riddle
            9: {
                a: "10",
                b: "35",
                location1: "school",
                location2: "park",
                traveler: "Blake"
            },
            // Variable on Both Sides
            10: {
                a: "5",
                b: "10",
                c: "3",
                d: "22",
                game: "MathQuest"
            },
            // Fraction Challenge
            11: {
                a: "4",
                b: "9",
                c: "12",
                character: "Quinn",
                prize: "gold medal"
            }
        };

        setInputs(defaultValues[selectedTemplate]);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
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
                <h1 className="text-3xl font-bold text-green-800">Algebra-Libs</h1>
                <p className="text-gray-600 mt-2">
                    Create your own algebra stories! Fill in the blanks, generate a story with an equation, and solve it.
                </p>
            </div>

            {selectedTemplate === null ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Choose a Story Template:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {storyTemplates.map((template, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-green-50 transition-colors"
                                onClick={() => handleTemplateSelect(index)}
                            >
                                <h3 className="font-medium text-lg mb-2">{template.title}</h3>
                                <p className="text-sm text-gray-600">
                                    Create a story about {template.title.toLowerCase()} and solve the equation.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold mb-4">{storyTemplates[selectedTemplate].title}</h2>

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
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap justify-between gap-2 mt-6">
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTemplate(null)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Choose Different Template
                                    </button>
                                    <button
                                        type="button"
                                        onClick={fillWithExampleValues}
                                        className="px-4 py-2 border border-indigo-300 bg-indigo-50 rounded-md text-indigo-700 hover:bg-indigo-100"
                                    >
                                        Fill with Example Values
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
                                    <h3 className="text-lg font-medium mb-2">Equation to Solve:</h3>
                                    <div className="text-2xl font-bold text-center py-4 bg-green-50 rounded">
                                        {equation}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-lg font-medium mb-4">Your Solution:</h3>
                                <div className="flex flex-col md:flex-row gap-4 items-end mb-4">
                                    <div className="flex-grow">
                                        <label htmlFor="userAnswer" className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Answer
                                        </label>
                                        <input
                                            type="number"
                                            id="userAnswer"
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            placeholder="Enter your answer"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                            step="any"
                                        />
                                    </div>
                                    <button
                                        onClick={checkAnswer}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Check Answer
                                    </button>
                                </div>

                                {isCorrect !== null && (
                                    <div className={`p-4 rounded-md ${isCorrect ? 'bg-green-100' : 'bg-red-100'} mb-4`}>
                                        <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                            {isCorrect ? '✓ Correct!' : '✗ Not quite right. Try again or check the solution.'}
                                        </p>
                                    </div>
                                )}

                                {showAnswer && (
                                    <div className="mt-4 p-4 bg-blue-50 rounded-md">
                                        <h4 className="font-medium text-blue-800">Solution:</h4>
                                        <p className="mt-2">The answer is: {correctAnswer}</p>
                                        <p className="mt-2">{explanation}</p>
                                    </div>
                                )}

                                <div className="flex justify-between mt-6">
                                    <button
                                        onClick={() => {
                                            setStory(null);
                                            setEquation(null);
                                            setUserAnswer('');
                                            setCorrectAnswer(null);
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