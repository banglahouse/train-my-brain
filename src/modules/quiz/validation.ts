import { celebrate, Joi, Segments } from 'celebrate';

/**
 * Validation for creating a new quiz.
 * Ensures the request body contains a valid title and an array of questions.
 */
export const createQuizValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(), // Quiz title, required and non-empty
        questions: Joi.array().items(
            Joi.object().keys({
                text: Joi.string().required(), // Question text, required and non-empty
                options: Joi.array().items(Joi.string().required()).length(4).required(), // Array of 4 answer options, all required
                correctOption: Joi.number().integer().min(0).max(3).required(), // Index of the correct option, must be between 0 and 3
            })
        ).min(1).required(), // Requires at least one question
    }),
});

/**
 * Validation for fetching a quiz by ID.
 * Ensures the request contains a valid quiz ID parameter.
 */
export const getQuizValidator = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(), // Quiz ID, required and non-empty
    }),
});

/**
 * Validation for submitting an answer to a quiz question.
 * Ensures the request contains valid quiz ID, question ID, and selected option.
 */
export const submitAnswerValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        quizId: Joi.string().required(), // Quiz ID, required and non-empty
        questionId: Joi.string().required(), // Question ID, required and non-empty
        selectedOption: Joi.number().required(), // Selected answer option, must be a valid number
    }),
    [Segments.PARAMS]: Joi.object().keys({
        userId: Joi.string().required(), // User ID, required and non-empty
    }),
});

/**
 * Validation for retrieving quiz results for a user.
 * Ensures the request contains valid quiz and user ID parameters.
 */
export const getResultValidator = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        quizId: Joi.string().required(), // Quiz ID, required and non-empty
        userId: Joi.string().required(), // User ID, required and non-empty
    }),
});
