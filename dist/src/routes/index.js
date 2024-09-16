"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const route_constant_1 = require("./route-constant");
const v1_1 = require("./v1");
/**
 * Class to initialize the application routes.
 * This class sets up the routing for the entire application.
 */
class AppRoutes {
    /**
     * Initializes all application routes.
     *
     * @param router - The Express router instance used to define the routes.
     */
    static initAppRoutes(router) {
        // Initialize version 1 of the routes using the versioned router
        v1_1.RoutingVersion.versionOne(router, route_constant_1.routesVersion.V1);
    }
}
exports.AppRoutes = AppRoutes;
