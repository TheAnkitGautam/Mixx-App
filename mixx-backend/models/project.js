const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      audioURL: {
            type: String,
            required: true
      },
      audioFormat: {
            type: String,
            required: true
      },
      creationTime: {
            type: Date,
            required: true,
            default: Date.now
      },
      /* Implemented both timestamp and comment as an array of objects
       [{timestamp: 0, comment: "This is a comment"}, {timestamp: 1, comment: "This is another comment"}]
       we could also have made it two separate arrays, but I think this is better */
      timeStampAndComment: {
            type: Array,
            required: false
      },
      user: {
            type: String,
            required: true
      }
});

module.exports = mongoose.model('Project', projectSchema);