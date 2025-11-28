const mongoose = require("mongoose");

const executiveformSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
  address: String,
  phone: String
},
  { timestamps: true });

const memberExecutive = mongoose.model('ExecutiveMemberData', executiveformSchema);

module.exports = memberExecutive;
