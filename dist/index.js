"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
// Create a new instance of the App class
const app = new app_1.default();
// Attempt to establish a database connection
app
    .dbConnection()
    .then((d) => {
    // If the connection is successful, start the server
    app.start();
})
    .catch((error) => {
    // If an error occurs during the database connection, log the error
    console.log({ error });
});
