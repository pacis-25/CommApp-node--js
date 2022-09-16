const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, 'File Required']
    },
    fileName: {
    type: String,
    required: [true, 'File is Required'],
  },
  sharerId: {
    type: String,
    required: true
  },
  sharedUser: [{
    SharerId: {
      type: String,
      required: true
    },
    sharerEmail: {
      type: String
    },
    fileName: {
      type: String
    },
    label: {
      type: String
    },
    sharedName: {
      type: String
    }
  }]
 
});

const Uploads = mongoose.model("uploads", userSchema);
module.exports = Uploads;