const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });


const app = require('./app');
const connectDatabase = require('./config/database');

//Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
});

//Connecting to database
connectDatabase();




const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);

});

//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});