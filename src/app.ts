import express, { Router, Request, Response } from 'express';
import { AppRoutes } from './routes/index';
import cors from 'cors';
import bodyParser from "body-parser";
import { errorHandler } from './middleware/errorHandler';

export default class App {
	port: string | number;
	app: express.Application;
    router: Router;
    
	constructor() {
		// Initialize port from environment variable or default to 4000
		this.port = process.env.APP_PORT ?? 4000;
		// Initialize Express application
		this.app = express();
		// Set up middlewares (CORS, body-parser, static files, etc.)
        this.initializeMiddleware();
        // Initialize router instance for routing
        this.router = express.Router();
        // Setup application routes
        this.initializeRoutes();
	}

    /** 
     * Initialize CORS and other middleware configurations
     * CORS currently allows all origins, which should be restricted in production
    */
    private initializeMiddleware(): void {
        // Middleware to parse incoming JSON request bodies
        this.app.use(bodyParser.json());
        // Middleware to parse URL-encoded request bodies
        this.app.use(bodyParser.urlencoded({extended: true}));
        // Serve static files from "public" directory
        this.app.use(express.static("public"));

        // CORS setup to handle cross-origin requests and headers
        this.app.use(cors());
        
        // Custom middleware to set various CORS headers for all responses
        this.app.use(async (req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTION');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Max-Age', '1800');
            res.setHeader('Access-Control-Allow-Headers', '*');
            await next();
        });
    }

    /**
     * Initialize routes for the application
     * Routes are defined in a separate file (AppRoutes)
     */
    private initializeRoutes(): void {
        // Initialize application routes using the router
        AppRoutes.initAppRoutes(this.router);
        // Use the router to handle defined routes
        this.app.use(this.router);
        // Simple health check route to check server status
        this.app.get('/health', (_req: Request, res: Response) => {
            res.status(200).json("status okay");
        });
        // Global error handler middleware
        this.app.use(errorHandler);
    }

    /**
     * Placeholder for initializing the database connection
     * This method should be implemented to establish a connection with the database
     */
    async dbConnection(): Promise<void> {
        // Implement database connection logic here
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
