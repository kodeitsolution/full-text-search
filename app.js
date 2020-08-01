const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();



// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://admin:taoyranvpxyK3Cne@cluster0-st6gh.mongodb.net/events?retryWrites=true&w=majority"

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// mongoose & mongo tests
app.post("/add-event", (req, res) => {
  const blog = new Blog({
    eventName: req.query.eventName,
    eventCategory: req.query.category,
    city: req.query.city,
    eid: req.query.eid
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-events", (req, res) => {
  Blog.find({ $text: { $search: 'any' } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/search", function (req, res) {
  Blog.find({
    $text: {
      $search: req.query.term,
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// // 404 page
// app.use((req, res) => {
//   res.status(404).render("404", { title: "404" });
// });
