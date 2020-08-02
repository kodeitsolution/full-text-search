const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventCategory: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  eid: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventEndDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

const Blog = mongoose.model('Events', EventSchema);
// Blog.createIndexes({ eventName: 'text', eventCategory: 'text', city: 'text' })
// Blog.createIndexes({"$**":"text"})
module.exports = Blog;