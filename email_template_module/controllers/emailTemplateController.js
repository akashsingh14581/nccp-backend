const EmailTemplate = require('../models/emailTemplateModels');

// Create a new email template

exports.createEmailTemplate = async (req, res) => {
  console.log('Received data:', req.body);  // Log the request body for debugging

  const emailTemplateData = req.body;
  const newEmailTemplate = new EmailTemplate(emailTemplateData);
  try {
    const savedTemplate = await newEmailTemplate.save();
    console.log('Saved template:', savedTemplate);  // Log the saved template
    res.status(201).json(savedTemplate);
  } catch (error) {
    console.error('Error saving email template:', error);  // Log the error
    res.status(500).json({ message: 'Error saving email template' });
  }
};

// Fetch all email templates
exports.getEmailTemplateData = async (req, res) => {
  try {
    const templateData = await EmailTemplate.find();
    res.status(200).json(templateData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
};

// Update an email template by ID
exports.updateEmailTemplate = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  // Log incoming data for debugging
  console.log('Request params ID:', id);
  console.log('Request body:', updatedData);

  try {
    // Ensure _id is not included in the update data to avoid duplication error
    if (updatedData._id) delete updatedData._id;

    const updatedTemplate = await EmailTemplate.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedTemplate) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json({ message: 'Template updated successfully', updatedTemplate });
  } catch (error) {
    // Log the actual error
    console.error('Error updating template:', error);
    res.status(500).json({ message: 'Error updating template', error });
  }
};

// Delete an email template by ID
exports.deleteEmailTemplate = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTemplate = await EmailTemplate.findByIdAndDelete(id); // Correct the model name
    if (!deletedTemplate) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting template' });
  }
};
