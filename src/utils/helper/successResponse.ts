// helpers/responses.ts

import { Response } from 'express';

/**
 * Sends a standardized success response.
 * 
 * @param res - The Express Response object.
 * @param statusCode - The HTTP status code to send (default is 200).
 * @param data - The data to include in the response body.
 */
export const successResponse = (res: Response, statusCode: number = 200, data: any) => {
    res.status(statusCode).json({ success: true, data });
};

