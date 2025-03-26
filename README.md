# JackTeaches

An interactive educational platform for learning mathematics and other subjects through engaging activities and lessons.

## Features

- **Algebra Lessons**: Interactive algebra lessons with various difficulty levels
- **Algebra-Libs**: Create your own algebraic stories and solve equations
- **Linear Equations**: Visualize and practice with linear equations
- **Systems of Equations**: Learn to solve systems of equations with multiple variables

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/jackteaches.git

# Navigate to project directory
cd jackteaches

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

## Deployment

### Deploying to Vercel

This project is optimized for deployment on Vercel:

1. Fork or push this repository to your GitHub account
2. Sign up or log in to [Vercel](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. Keep the default settings and click "Deploy"
5. Once deployed, you'll receive a URL to your live site

Your site will automatically redeploy when you push changes to your repository.

## Project Structure

- `src/app/`: Main application code
  - `page.tsx`: Home page
  - `subjects/`: Subject-specific pages
    - `algebra/`: Algebra-related pages and components
      - `lessons/`: Individual algebra lessons
        - `algebra-libs/`: The Algebra-Libs game

- `src/components/`: Reusable UI components
  - `Navbar.tsx`: Navigation component

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm start` - Starts the production server
- `npm run lint` - Runs the linter

## License

This project is licensed under the MIT License.
