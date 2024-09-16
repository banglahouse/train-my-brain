import { Router } from 'express';
import quizRoutes from '../../modules/quiz/routes';

/**
 * Class for handling API versioning.
 * Provides methods for setting up different versions of routes.
 */
export class RoutingVersion {
    /**
     * Sets up version 1 of the API routes.
     * 
     * @param router - The Express router instance.
     * @param prefix - The API prefix to apply (e.g., '/api/v1').
     */
    static versionOne(router: Router, prefix: string): void {
        // Initialize quiz-related routes with the specified version prefix
        quizRoutes(router, prefix);
    }
}
