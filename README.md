# Train My Brain

## Overview
**Train My Brain** is a RESTful API application built for creating and managing multiple-choice quizzes. The application allows users to create quizzes, retrieve specific quizzes, submit answers to quiz questions, and view results.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Development Tools](#development-tools)
- [Author](#author)
- [License](#license)

## Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14 or later)
- **npm** (Node package manager)

## Installation

### Clone the repository:
```bash
git clone <repository-url>
cd train-my-brain

Install dependencies:
bash
Copy code
npm install
Running the Application
Development Mode:
To run the app in development mode with TypeScript support, use:

bash
Copy code
npm run start:dev
This command uses ts-node-dev to run the TypeScript code with real-time reloading.

Production Mode:
To compile the TypeScript code and run the compiled JavaScript, use:

bash
Copy code
npm start
This will compile the TypeScript files and execute the dist/index.js file.

Scripts
1. Start (Development):
bash
Copy code
npm run start:dev
Runs the app in development mode with hot-reloading using ts-node-dev.

2. Build and Start (Production):
bash
Copy code
npm start
Compiles TypeScript to JavaScript and runs the compiled files.

3. Test:
Currently, there are no tests specified. You can run the default test script:

bash
Copy code
npm test
API Endpoints
1. Create a New Quiz
Endpoint: POST /api/v1/quiz
Description: Creates a new quiz with a title and a list of questions.
Request Body:
json
Copy code
{
  "title": "Math Quiz",
  "questions": [
    {
      "text": "What is 2+2?",
      "options": ["1", "2", "3", "4"],
      "correctOption": 3
    }
  ]
}
2. Retrieve a Quiz by ID
Endpoint: GET /api/v1/quiz/:id
Description: Fetches a quiz by its ID.
URL Parameters:
id (string): Quiz ID.
3. Submit an Answer
Endpoint: POST /api/v1/quiz/answer/:userId
Description: Submits an answer for a quiz question.
URL Parameters:
userId (string): User ID.
Request Body:
json
Copy code
{
  "quizId": "quiz123",
  "questionId": "question123",
  "selectedOption": 2
}
4. Fetch Quiz Results
Endpoint: GET /api/v1/quiz/:quizId/results/:userId
Description: Fetches the quiz results for a specific user.
URL Parameters:
quizId (string): Quiz ID.
userId (string): User ID.
Dependencies
express: A fast web framework for Node.js.
celebrate: Validation middleware for Express using Joi.
cors: Middleware to enable Cross-Origin Resource Sharing.
body-parser: Parses incoming request bodies in a middleware before your handlers.
joi: A powerful schema description and validation library.
uuid: A package to generate unique IDs for quizzes and questions.
Development Tools
ts-node-dev: A development tool that runs TypeScript files with real-time reload.
@types/*: Type definitions for the dependencies used, ensuring TypeScript compatibility.
Author
This project is maintained by [Your Name].

License
This project is licensed under the ISC License