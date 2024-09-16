import { NextFunction, Request, Response } from 'express';

/**
 * A utility function that wraps an Express route handler to handle errors consistently.
 * It ensures that any error thrown inside the handler is caught and passed to the next middleware.
 * 
 * @param handler - The route handler function to wrap.
 * @returns A function that processes the request and passes errors to the next middleware.
 */
export const controller = (handler: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Run the handler and wait for its completion
            await handler(req, res, next);
        } catch (error) {
            // Forward errors to the next middleware (usually an error handler)
            next(error);
        }
    };
};
