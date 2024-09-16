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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const errorHandler_1 = require("./middleware/errorHandler");
class App {
    constructor() {
        var _a;
        // Initialize port from environment variable or default to 4000
        this.port = (_a = process.env.APP_PORT) !== null && _a !== void 0 ? _a : 4000;
        // Initialize Express application
        this.app = (0, express_1.default)();
        // Set up middlewares (CORS, body-parser, static files, etc.)
        this.initializeMiddleware();
        // Initialize router instance for routing
        this.router = express_1.default.Router();
        // Setup application routes
        this.initializeRoutes();
    }
    /**
     * Initialize CORS and other middleware configurations
     * CORS currently allows all origins, which should be restricted in production
    */
    initializeMiddleware() {
        // Middleware to parse incoming JSON request bodies
        this.app.use(body_parser_1.default.json());
        // Middleware to parse URL-encoded request bodies
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        // Serve static files from "public" directory
        this.app.use(express_1.default.static("public"));
        // CORS setup to handle cross-origin requests and headers
        this.app.use((0, cors_1.default)());
        // Custom middleware to set various CORS headers for all responses
        this.app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTION');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Max-Age', '1800');
            res.setHeader('Access-Control-Allow-Headers', '*');
            yield next();
        }));
    }
    /**
     * Initialize routes for the application
     * Routes are defined in a separate file (AppRoutes)
     */
    initializeRoutes() {
        // Initialize application routes using the router
        index_1.AppRoutes.initAppRoutes(this.router);
        // Use the router to handle defined routes
        this.app.use(this.router);
        // Simple health check route to check server status
        this.app.get('/health', (_req, res) => {
            res.status(200).json("status okay");
        });
        // Global error handler middleware
        this.app.use(errorHandler_1.errorHandler);
    }
    /**
     * Placeholder for initializing the database connection
     * This method should be implemented to establish a connection with the database
     */
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement database connection logic here
        });
    }
    /**
     * Start the server on the defined port and log the status
     */
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }
}
exports.default = App;
