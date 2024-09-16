"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
/**
 * A utility function that wraps an Express route handler to handle errors consistently.
 * It ensures that any error thrown inside the handler is caught and passed to the next middleware.
 *
 * @param handler - The route handler function to wrap.
 * @returns A function that processes the request and passes errors to the next middleware.
 */
const controller = (handler) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Run the handler and wait for its completion
            yield handler(req, res, next);
        }
        catch (error) {
            // Forward errors to the next middleware (usually an error handler)
            next(error);
        }
    });
};
exports.controller = controller;
