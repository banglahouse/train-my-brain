/**
 * Literal messages used across the application for consistent error and status messaging.
 * These messages are used in various parts of the application for responses and error handling.
 */
export const literals = {
    quizNotFound: 'Quiz not found', // Message when a requested quiz is not found
    resultNotFound: 'Results not found', // Message when quiz results for a user are not found
    validationError: 'Validation failed', // Message for validation errors in request data
    internalServerError: 'Internal Server Error', // Generic message for server-side errors
    questionNotFound: 'Question not found', // Message when a requested question in a quiz is not found
    answerAlreadyExists: 'Answer is already submitted' // Message when an answer has already been submitted for a question
};
