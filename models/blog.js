const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    text: true
  },
  eventCategory: {
    type: String,
    required: true,
    text: true
  },
  city: {
    type: String,
    required: true,
    text: true
  },
  eid: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Blog = mongoose.model('Events', EventSchema);
// Blog.createIndexes({ eventName: 'text', eventCategory: 'text', city: 'text' })
// Blog.createIndexes({"$**":"text"})
module.exports = Blog;