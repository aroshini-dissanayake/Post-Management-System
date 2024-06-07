const express = require("express");
const cors = require("cors");
require("express-async-errors");

const databaseConfig = require("./src/config/database.config");
const errorHandlerMiddleware = require("./src/error/error.middleware");
const NotFoundError = require("./src/error/NotFoundError");

const constants = require("./src/constants");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//error handling middleware
app.use(errorHandlerMiddleware);

//404 route
app.use((req, res, next) => {
  throw new NotFoundError(`Route not found ${req.originalUrl}`);
});

const start = async () => {
  const port = process.env.PORT || 3000;
  try {
    await databaseConfig.connectDB();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
