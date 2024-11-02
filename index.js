require("dotenv").config();
const express = require("express");
const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const authRoutes = require("./routes/auth");
const taskRoute = require("./routes/task");

dotenv.config();

app.use(
  cors({
    origin: "*"
  })
);

// Middleware for all connections
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/v1/auth", authRoutes); //Middleware to add the route auth.js
app.use("/v1/task", taskRoute);

// app.use("/v1/task", authMiddleware, taskRoute);

// To log request made
app.use((req, res, next) => {
  const reqString = `${req.method} ${req.url} ${Date.now()}\n `;
  fs.writeFile("log.txt", reqString, { flag: "a" }, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File written successfully");
    }
  });
  next();
});
//  To log error
app.use((err, req, res, next) => {
  // Create a string with error details
  const reqString = `Error: ${err.message}\n`;
  // Write the error details to a file
  fs.writeFile("error.txt", reqString, { flag: "a" }, (writeErr) => {
    if (writeErr) {
      console.error("Error writing file:", writeErr);
    }
  });
  // Pass the error to the next middleware (or default error handler)
  res.status(500).send("Something went wrong!");
  next();
});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log("Database Connected!"))
    .catch((err) => console.log(err));
  console.log("Server is running on port 3000");
});
