const mongoose = require('mongoose');

// Email Template Schema
const EmailTemplateSchema = new mongoose.Schema({
  templateName: { type: String, required: true },
  templateTitle: { type: String, required: true },
  templateSubject: { type: String, required: true },
  templateContent: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('EmailTemplate', EmailTemplateSchema);
