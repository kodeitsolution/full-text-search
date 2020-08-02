const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

// mongoose & mongo tests
router.post("/add-event", async (req, res) => {
  const blog = new Blog({
    eventName: req.body.eventName,
    eventCategory: req.body.eventCategory,
    city: req.body.city,
    eid: req.body.eid,
    eventDate: req.body.eventDate,
    eventEndDate: req.body.eventEndDate,
  });

  try {
    const saveEvent = await blog.save();
    res.json(saveEvent);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/all-events", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/search", async function (req, res) {
  try {
    const result = await Blog.find({
      $text: { $search: req.body.term }
    });
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", async function (req, res) {
  try {
    const result = await Blog.find({ eid: req.query.id });
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
