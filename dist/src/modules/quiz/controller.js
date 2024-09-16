"use strict";
// controllers/quizController.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResults = exports.submitAnswer = exports.getQuiz = exports.createQuiz = void 0;
const controllerHandler_1 = require("../../middleware/controllerHandler");
const quizService = __importStar(require("./service"));
const errorResponse_1 = require("../../utils/helper/errorResponse");
const literals_1 = require("../../constants/literals");
/**
 * Handles quiz creation.
 * Accepts title and questions from the request body, creates the quiz,
 * and returns the created quiz.
 */
exports.createQuiz = (0, controllerHandler_1.controller)((req, res) => {
    const { title, questions } = req.body;
    const quiz = quizService.createQuiz(title, questions);
    (0, errorResponse_1.successResponse)(res, 201, quiz); // Respond with created quiz
});
/**
 * Fetches a quiz by its ID.
 * Returns the quiz (without correct answers) or a 404 error if not found.
 */
exports.getQuiz = (0, controllerHandler_1.controller)((req, res) => {
    const { id } = req.params;
    const quiz = quizService.getQuiz(id);
    if (!quiz) {
        return (0, errorResponse_1.errorResponse)(res, 404, { message: literals_1.literals.quizNotFound }); // Respond with 404 if quiz not found
    }
    // Return quiz without correct answers
    const quizWithoutAnswers = Object.assign(Object.assign({}, quiz), { questions: quiz.questions.map(q => ({
            id: q.id,
            text: q.text,
            options: q.options,
        })) });
    (0, errorResponse_1.successResponse)(res, 200, quizWithoutAnswers); // Respond with quiz details
});
/**
 * Submits an answer for a quiz question.
 * Accepts quiz ID, question ID, and selected option, and returns the result.
 */
exports.submitAnswer = (0, controllerHandler_1.controller)((req, res) => {
    const { quizId, questionId, selectedOption } = req.body;
    const { userId } = req.params;
    const result = quizService.submitAnswer(quizId, userId, questionId, selectedOption);
    (0, errorResponse_1.successResponse)(res, 200, result); // Respond with answer result
});
/**
 * Fetches quiz results for a user.
 * Returns the user's score and answers, or a 404 error if not found.
 */
exports.getResults = (0, controllerHandler_1.controller)((req, res) => {
    const { quizId, userId } = req.params;
    const result = quizService.getResults(quizId, userId);
    if (!result) {
        return (0, errorResponse_1.errorResponse)(res, 404, { message: literals_1.literals.resultNotFound }); // Respond with 404 if results not found
    }
    (0, errorResponse_1.successResponse)(res, 200, result); // Respond with quiz results
});
