const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const EventsRoutes = require("./routes/eventsRoutes");
// express app
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

// connect to mongodb & listen for requests

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// middleware & static files
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", EventsRoutes);
// // 404 page
// app.use((req, res) => {
//   res.status(404).render("404", { title: "404" });
// });
