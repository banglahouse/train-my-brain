import { Router } from 'express';
import { routesVersion } from './route-constant';
import { RoutingVersion } from './v1';

/**
 * Class to initialize the application routes.
 * This class sets up the routing for the entire application.
 */
export class AppRoutes {
  /**
   * Initializes all application routes.
   * 
   * @param router - The Express router instance used to define the routes.
   */
  static initAppRoutes(router: Router): void {
    // Initialize version 1 of the routes using the versioned router
    RoutingVersion.versionOne(router, routesVersion.V1);
  }
}
