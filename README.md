# Train My Brain

## Overview
**Train My Brain** is a RESTful API application built for creating and managing multiple-choice quizzes. The application allows users to create quizzes, retrieve specific quizzes, submit answers to quiz questions, and view results.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Limitation] (#limitation)
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
```console
git clone <repository-url>
cd train-my-brain
```

### Install dependencies:
```console
npm install
```
Running the Application

### Development Mode:
To run the app in development mode with TypeScript support, use:
```console
npm run start:dev
```
This command uses ts-node-dev to run the TypeScript code with real-time reloading.

### Production Mode:
To compile the TypeScript code and run the compiled JavaScript, use:
```console
npm start
```
This will compile the TypeScript files and execute the dist/index.js file.


### Dependencies
express: A fast web framework for Node.js.
celebrate: Validation middleware for Express using Joi.
cors: Middleware to enable Cross-Origin Resource Sharing.
body-parser: Parses incoming request bodies in a middleware before your handlers.
joi: A powerful schema description and validation library.
uuid: A package to generate unique IDs for quizzes and questions.

## Limitation
No database or cache memory like redis is used for storing data in memory so as soon as server is closed or restarted,
all the data will be lost.


### Development Tools
ts-node-dev: A development tool that runs TypeScript files with real-time reload.
@types/*: Type definitions for the dependencies used, ensuring TypeScript compatibility.

### Author
This project is maintained by Suman chakravarty.

License
This project is licensed under the ISC License