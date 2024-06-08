const express = require("express");
const cors = require("cors");
const path = require("path");
require("express-async-errors");

const databaseConfig = require("./src/config/database.config");
const errorHandlerMiddleware = require("./src/error/error.middleware");
const NotFoundError = require("./src/error/NotFoundError");

const constants = require("./src/constants");
require("dotenv").config();

const app = express();

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());

//import routes
const postRouter = require("./src/router/post.router");

//define routes
app.use(constants.API.PREFIX.concat("/post"), postRouter);

//error handling middleware
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Post Management System"); // Send a simple response
});

//404 route
app.use((req, res) => {
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
