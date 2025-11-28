
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  year: Number
});

const Form = mongoose.model('FormData', formSchema);

module.exports = Form;