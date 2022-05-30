const express = require("express");
const app = express();
const postsRoutes = require("./api/posts/posts.routes");
const connectDb = require("./database");
const mongoose = require("mongoose");

connectDb();
app.use(express.json());
app.use("/posts", postsRoutes);

app.use((req, res, next) => {
  console.log("I'm another middleware method");
  next();
});

//Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: "Internal Server Error" || err });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
