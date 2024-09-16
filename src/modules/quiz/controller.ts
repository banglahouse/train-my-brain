// controllers/quizController.ts

import { Request, Response } from 'express';
import { controller } from '../../middleware/controllerHandler';
import * as quizService from './service';
import { errorResponse, successResponse } from '../../utils/helper/errorResponse';
import { literals } from '../../constants/literals';

/**
 * Handles quiz creation.
 * Accepts title and questions from the request body, creates the quiz, 
 * and returns the created quiz.
 */
export const createQuiz = controller((req: Request, res: Response) => {
    const { title, questions } = req.body;
    const quiz = quizService.createQuiz(title, questions);
    successResponse(res, 201, quiz);  // Respond with created quiz
});

/**
 * Fetches a quiz by its ID.
 * Returns the quiz (without correct answers) or a 404 error if not found.
 */
export const getQuiz = controller((req: Request, res: Response) => {
    const { id } = req.params;
    const quiz = quizService.getQuiz(id);
    
    if (!quiz) {
        return errorResponse(res, 404, { message: literals.quizNotFound });  // Respond with 404 if quiz not found
    }

    // Return quiz without correct answers
    const quizWithoutAnswers = {
        ...quiz,
        questions: quiz.questions.map(q => ({
            id: q.id,
            text: q.text,
            options: q.options,
        })),
    };
    
    successResponse(res, 200, quizWithoutAnswers);  // Respond with quiz details
});

/**
 * Submits an answer for a quiz question.
 * Accepts quiz ID, question ID, and selected option, and returns the result.
 */
export const submitAnswer = controller((req: Request, res: Response) => {
    const { quizId, questionId, selectedOption } = req.body;
    const { userId } = req.params;

    const result = quizService.submitAnswer(quizId, userId, questionId, selectedOption);
    successResponse(res, 200, result);  // Respond with answer result
});

/**
 * Fetches quiz results for a user.
 * Returns the user's score and answers, or a 404 error if not found.
 */
export const getResults = controller((req: Request, res: Response) => {
    const { quizId, userId } = req.params;
    const result = quizService.getResults(quizId, userId);
    
    if (!result) {
        return errorResponse(res, 404, { message: literals.resultNotFound });  // Respond with 404 if results not found
    }

    successResponse(res, 200, result);  // Respond with quiz results
});
