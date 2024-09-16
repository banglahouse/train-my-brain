import { Router } from 'express';
import { createQuizValidator, getQuizValidator, getResultValidator, submitAnswerValidator } from './validation';
import { createQuiz, getQuiz, getResults, submitAnswer } from './controller';

/**
 * Defines the routes related to quizzes.
 * 
 * @param router - The Express router instance.
 * @param prefix - The API version prefix (e.g., '/api/v1').
 */
export function quizRoutes(router: Router, prefix: string) {
    // Route to create a new quiz, with validation applied
    router.post(`${prefix}/quiz`, createQuizValidator, createQuiz);

    // Route to get details of a quiz by its ID, with validation applied
    router.get(`${prefix}/quiz/:id`, getQuizValidator, getQuiz);

    // Route to submit an answer to a quiz question, with validation applied
    router.post(`${prefix}/quiz/answer/:userId`, submitAnswerValidator, submitAnswer);

    // Route to fetch results of a quiz for a specific user, with validation applied
    router.get(`${prefix}/quiz/:quizId/results/:userId`, getResultValidator, getResults);
}

export default quizRoutes;
