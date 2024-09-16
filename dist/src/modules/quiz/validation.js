"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultValidator = exports.submitAnswerValidator = exports.getQuizValidator = exports.createQuizValidator = void 0;
const celebrate_1 = require("celebrate");
/**
 * Validation for creating a new quiz.
 * Ensures the request body contains a valid title and an array of questions.
 */
exports.createQuizValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        title: celebrate_1.Joi.string().required(), // Quiz title, required and non-empty
        questions: celebrate_1.Joi.array().items(celebrate_1.Joi.object().keys({
            text: celebrate_1.Joi.string().required(), // Question text, required and non-empty
            options: celebrate_1.Joi.array().items(celebrate_1.Joi.string().required()).length(4).required(), // Array of 4 answer options, all required
            correctOption: celebrate_1.Joi.number().integer().min(0).max(3).required(), // Index of the correct option, must be between 0 and 3
        })).min(1).required(), // Requires at least one question
    }),
});
/**
 * Validation for fetching a quiz by ID.
 * Ensures the request contains a valid quiz ID parameter.
 */
exports.getQuizValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().required(), // Quiz ID, required and non-empty
    }),
});
/**
 * Validation for submitting an answer to a quiz question.
 * Ensures the request contains valid quiz ID, question ID, and selected option.
 */
exports.submitAnswerValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        quizId: celebrate_1.Joi.string().required(), // Quiz ID, required and non-empty
        questionId: celebrate_1.Joi.string().required(), // Question ID, required and non-empty
        selectedOption: celebrate_1.Joi.number().required(), // Selected answer option, must be a valid number
    }),
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object().keys({
        userId: celebrate_1.Joi.string().required(), // User ID, required and non-empty
    }),
});
/**
 * Validation for retrieving quiz results for a user.
 * Ensures the request contains valid quiz and user ID parameters.
 */
exports.getResultValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object().keys({
        quizId: celebrate_1.Joi.string().required(), // Quiz ID, required and non-empty
        userId: celebrate_1.Joi.string().required(), // User ID, required and non-empty
    }),
});
