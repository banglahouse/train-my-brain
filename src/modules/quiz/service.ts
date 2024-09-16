// services/quizService.ts

import { literals } from '../../constants/literals';
import { Answer } from '../../models/answer';
import { Question, Quiz } from '../../models/quiz';
import { Result } from '../../models/result';
import { v4 as uuidv4 } from 'uuid';

// In-memory stores for quizzes and results
const quizData: Quiz[] = [];
const resultData: Result[] = [];

/**
 * Creates a quiz with the given title and questions.
 * 
 * @param title - The quiz title.
 * @param questions - List of questions for the quiz.
 * @returns The newly created quiz object.
 */
export const createQuiz = (title: string, questions: Question[]): Quiz => {
    // Map each question with a unique ID
    const formattedQuestions = questions.map((question) => ({
        id: uuidv4(),
        text: question.text,
        options: question.options,
        correctOption: question.correctOption,
    }));

    // Create the quiz object with a unique ID
    const quiz: Quiz = {
        id: uuidv4(),
        title,
        questions: formattedQuestions,
    };

    // Store the created quiz
    quizData.push(quiz);
    return quiz;
};

/**
 * Finds a quiz based on its ID.
 * 
 * @param quizId - The quiz identifier.
 * @returns The matching quiz object, or undefined if not found.
 */
export const getQuiz = (quizId: string): Quiz | undefined => {
    return quizData.find(quiz => quiz.id === quizId);
};

/**
 * Submits a user's answer for a specific quiz question.
 * 
 * @param quizId - The quiz identifier.
 * @param userId - The user submitting the answer.
 * @param questionId - The question identifier.
 * @param selectedOption - The option chosen by the user.
 * @returns Result indicating if the answer is correct and, if wrong, the correct answer.
 * @throws Error if the quiz or question is not found, or if an answer was already submitted.
 */
export const submitAnswer = (
    quizId: string,
    userId: string,
    questionId: string,
    selectedOption: number
): { isCorrect: boolean; correctOption?: number } => {
    // Locate the quiz by its ID
    const quiz = quizData.find(q => q.id === quizId);
    if (!quiz) throw new Error(literals.quizNotFound);

    // Locate the question within the quiz
    const question = quiz.questions.find(q => q.id === questionId);
    if (!question) throw new Error(literals.questionNotFound);

    // Check if the selected option is correct
    const isCorrect = question.correctOption === selectedOption;
    const userAnswer: Answer = { questionId, selectedOption, isCorrect };

    // Retrieve or initialize the result object for the user
    let userResult = resultData.find(r => r.quizId === quizId && r.userId === userId);
    if (!userResult) {
        userResult = {
            quizId,
            userId,
            score: isCorrect ? 1 : 0,
            answers: [userAnswer],
        };
        resultData.push(userResult);
    } else {
        // Verify the question hasn't already been answered
        if (userResult.answers.some(answer => answer.questionId === questionId)) {
            throw new Error(literals.answerAlreadyExists);
        }

        // Add the new answer and update the score if correct
        userResult.answers.push(userAnswer);
        if (isCorrect) userResult.score += 1;
    }

    // Return the result, indicating correctness and correct option if wrong
    return { isCorrect, correctOption: isCorrect ? undefined : question.correctOption };
};

/**
 * Retrieves a user's result for a specific quiz.
 * 
 * @param quizId - The quiz identifier.
 * @param userId - The user identifier.
 * @returns The result object, or undefined if no result found.
 */
export const getResults = (quizId: string, userId: string): Result | undefined => {
    return resultData.find(result => result.quizId === quizId && result.userId === userId);
};
