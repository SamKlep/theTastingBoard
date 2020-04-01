const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: String
  },
  descrition: {
    type: String
  },
  rating: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('drink', ContactSchema);
