"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingVersion = void 0;
const routes_1 = __importDefault(require("../../modules/quiz/routes"));
/**
 * Class for handling API versioning.
 * Provides methods for setting up different versions of routes.
 */
class RoutingVersion {
    /**
     * Sets up version 1 of the API routes.
     *
     * @param router - The Express router instance.
     * @param prefix - The API prefix to apply (e.g., '/api/v1').
     */
    static versionOne(router, prefix) {
        // Initialize quiz-related routes with the specified version prefix
        (0, routes_1.default)(router, prefix);
    }
}
exports.RoutingVersion = RoutingVersion;
