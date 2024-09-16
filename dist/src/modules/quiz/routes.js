"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRoutes = quizRoutes;
const validation_1 = require("./validation");
const controller_1 = require("./controller");
/**
 * Defines the routes related to quizzes.
 *
 * @param router - The Express router instance.
 * @param prefix - The API version prefix (e.g., '/api/v1').
 */
function quizRoutes(router, prefix) {
    // Route to create a new quiz, with validation applied
    router.post(`${prefix}/quiz`, validation_1.createQuizValidator, controller_1.createQuiz);
    // Route to get details of a quiz by its ID, with validation applied
    router.get(`${prefix}/quiz/:id`, validation_1.getQuizValidator, controller_1.getQuiz);
    // Route to submit an answer to a quiz question, with validation applied
    router.post(`${prefix}/quiz/answer/:userId`, validation_1.submitAnswerValidator, controller_1.submitAnswer);
    // Route to fetch results of a quiz for a specific user, with validation applied
    router.get(`${prefix}/quiz/:quizId/results/:userId`, validation_1.getResultValidator, controller_1.getResults);
}
exports.default = quizRoutes;
