const mongoose = require('mongoose');

const lifefellowMemberSchema = new mongoose.Schema({
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

const UploadedexcellFile = mongoose.model('UploadedFellowMember', lifefellowMemberSchema);

module.exports = UploadedexcellFile;
