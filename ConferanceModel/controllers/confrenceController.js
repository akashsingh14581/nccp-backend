

const Form = require('../models/confrenceModels.js');

exports.createForm = async (req, res) => {
  const { name, year } = req.body;
  const formData = new Form({ name, year });

  try {
    const savedForm = await formData.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(500).json({ message: 'Error saving form data' });
  }
};

exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch form data' });
  }
};
