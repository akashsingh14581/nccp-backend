const mongoose = require('mongoose');

const lifeMemberSchema = new mongoose.Schema({
  id: {
    type: String,

  },
  name: {
    type: String,

  },
  address: {
    type: String,

  },
  state: {
    type: String,

  },
  status: {
    type: String,

  },
  phone: {
    type: String,

  },
  email: {
    type: String,

  }
}, { timestamps: true });

const UploadedXslFile = mongoose.model('UploadedLifeMember', lifeMemberSchema);

module.exports = UploadedXslFile;
