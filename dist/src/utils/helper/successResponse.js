"use strict";
// helpers/responses.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
/**
 * Sends a standardized success response.
 *
 * @param res - The Express Response object.
 * @param statusCode - The HTTP status code to send (default is 200).
 * @param data - The data to include in the response body.
 */
const successResponse = (res, statusCode = 200, data) => {
    res.status(statusCode).json({ success: true, data });
};
exports.successResponse = successResponse;
