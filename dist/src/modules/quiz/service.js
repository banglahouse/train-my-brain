"use strict";
// services/quizService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResults = exports.submitAnswer = exports.getQuiz = exports.createQuiz = void 0;
const literals_1 = require("../../constants/literals");
const uuid_1 = require("uuid");
// In-memory stores for quizzes and results
const quizData = [];
const resultData = [];
/**
 * Creates a quiz with the given title and questions.
 *
 * @param title - The quiz title.
 * @param questions - List of questions for the quiz.
 * @returns The newly created quiz object.
 */
const createQuiz = (title, questions) => {
    // Map each question with a unique ID
    const formattedQuestions = questions.map((question) => ({
        id: (0, uuid_1.v4)(),
        text: question.text,
        options: question.options,
        correctOption: question.correctOption,
    }));
    // Create the quiz object with a unique ID
    const quiz = {
        id: (0, uuid_1.v4)(),
        title,
        questions: formattedQuestions,
    };
    // Store the created quiz
    quizData.push(quiz);
    return quiz;
};
exports.createQuiz = createQuiz;
/**
 * Finds a quiz based on its ID.
 *
 * @param quizId - The quiz identifier.
 * @returns The matching quiz object, or undefined if not found.
 */
const getQuiz = (quizId) => {
    return quizData.find(quiz => quiz.id === quizId);
};
exports.getQuiz = getQuiz;
/**
 * Submits a user's answer for a specific quiz question.
 *
 * @param quizId - The quiz identifier.
 * @param userId - The user submitting the answer.
 * @param questionId - The question identifier.
 * @param selectedOption - The option chosen by the user.
 * @returns Result indicating if the answer is correct and, if wrong, the correct answer.
 * @throws Error if the quiz or question is not found, or if an answer was already submitted.
 */
const submitAnswer = (quizId, userId, questionId, selectedOption) => {
    // Locate the quiz by its ID
    const quiz = quizData.find(q => q.id === quizId);
    if (!quiz)
        throw new Error(literals_1.literals.quizNotFound);
    // Locate the question within the quiz
    const question = quiz.questions.find(q => q.id === questionId);
    if (!question)
        throw new Error(literals_1.literals.questionNotFound);
    // Check if the selected option is correct
    const isCorrect = question.correctOption === selectedOption;
    const userAnswer = { questionId, selectedOption, isCorrect };
    // Retrieve or initialize the result object for the user
    let userResult = resultData.find(r => r.quizId === quizId && r.userId === userId);
    if (!userResult) {
        userResult = {
            quizId,
            userId,
            score: isCorrect ? 1 : 0,
            answers: [userAnswer],
        };
        resultData.push(userResult);
    }
    else {
        // Verify the question hasn't already been answered
        if (userResult.answers.some(answer => answer.questionId === questionId)) {
            throw new Error(literals_1.literals.answerAlreadyExists);
        }
        // Add the new answer and update the score if correct
        userResult.answers.push(userAnswer);
        if (isCorrect)
            userResult.score += 1;
    }
    // Return the result, indicating correctness and correct option if wrong
    return { isCorrect, correctOption: isCorrect ? undefined : question.correctOption };
};
exports.submitAnswer = submitAnswer;
/**
 * Retrieves a user's result for a specific quiz.
 *
 * @param quizId - The quiz identifier.
 * @param userId - The user identifier.
 * @returns The result object, or undefined if no result found.
 */
const getResults = (quizId, userId) => {
    return resultData.find(result => result.quizId === quizId && result.userId === userId);
};
exports.getResults = getResults;
