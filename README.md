# JackTeaches

JackTeaches is an interactive learning platform designed to make education fun and engaging across various subjects including Math, Algebra, Science, Language Arts, and History.

## Features

- **Interactive Lessons**: Engage with content through interactive activities
- **Multiple Subjects**: Access a wide range of academic subjects
- **Algebra-Libs**: An educational game where users create personalized algebra stories by filling in blanks, then solve the resulting equations
- **Responsive Design**: Optimized for learning on any device

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd jackteaches
```

3. Install the dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app/`: Main application code
  - `page.tsx`: Home page
  - `subjects/`: Subject-specific pages
    - `algebra/`: Algebra-related pages and components
      - `lessons/`: Individual algebra lessons
        - `algebra-libs/`: The Algebra-Libs game

- `src/components/`: Reusable UI components
  - `Navbar.tsx`: Navigation component

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm start` - Starts the production server
- `npm run lint` - Runs the linter

## License

This project is licensed under the MIT License.
