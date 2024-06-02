require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const socialPostRoutes = require("./routes/socialPosts");
const accountRoutes = require("./routes/accounts");
const commentsRoutes = require("./routes/comments");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin:`http://3.88.10.51:3000`,
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/socialPosts", socialPostRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/socialPosts", commentsRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

process.env;
