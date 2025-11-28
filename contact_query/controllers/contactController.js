const Forms = require('../models/contactModels');

// POST: Create a new honorary member
exports.post_query = async (req, res) => {
  const Honorarymembersdata = req.body;
  const Honorarymembers = new Forms(Honorarymembersdata);

  try {
    const honorarymembs = await Honorarymembers.save();
    res.status(201).json(honorarymembs);
  } catch (error) {
    res.status(500).json({ message: 'Error creating honorary member' });
  }
};

// GET: Fetch all honorary members
exports.get_query = async (req, res) => {
  try {
    const membersdatas = await Forms.find();
    res.status(200).json(membersdatas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch honorary members' });
  }
};
