const mongoose = require("mongoose");

const HonorarymembersformSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String,
   phoneNumber: String,
   message: String,
  });

  const HonoraryMembers = mongoose.model('Contact_Us_Query', HonorarymembersformSchema);

module.exports =  HonoraryMembers;
