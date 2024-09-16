"use strict";
// middlewares/errorHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const celebrate_1 = require("celebrate");
const literals_1 = require("../constants/literals");
const errorResponse_1 = require("../utils/helper/errorResponse");
/**
 * Middleware function to handle errors in the application.
 *
 * This function processes different types of errors:
 * - Joi validation errors from Celebrate.
 * - General errors.
 *
 * @param err - The error object.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    // Check if the error is a Celebrate validation error
    if ((0, celebrate_1.isCelebrateError)(err)) {
        // Extract validation errors from the Celebrate error
        const validationError = err.details.get('body') || err.details.get('params') || err.details.get('query');
        // Remove backslashes and quotes from the error message for cleaner output
        const errorMessage = validationError === null || validationError === void 0 ? void 0 : validationError.message.replace(/['"]/g, "");
        // Send a 400 Bad Request response with the validation error details
        return (0, errorResponse_1.errorResponse)(res, 400, {
            status: 'error',
            message: errorMessage || literals_1.literals.validationError,
        });
    }
    // Handle general errors
    // Send a response with the error status and message
    (0, errorResponse_1.errorResponse)(res, err.status || 500, {
        status: 'error',
        message: err.message || literals_1.literals.internalServerError,
    });
};
exports.errorHandler = errorHandler;
