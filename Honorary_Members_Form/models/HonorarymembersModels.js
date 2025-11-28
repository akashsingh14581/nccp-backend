const mongoose = require("mongoose");

const HonorarymembersformSchema = new mongoose.Schema({
  id: String,
  name: String,
  address: String,
  state: String,
  email: String,
  phone: String,
  status: String,
}, { timestamps: true });

const HonoraryMembers = mongoose.model('NCCP_Honorary_Members', HonorarymembersformSchema);

module.exports = HonoraryMembers;
