import App from './src/app';

// Create a new instance of the App class
const app = new App();

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
