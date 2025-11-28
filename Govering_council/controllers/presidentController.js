

const Forms = require('../models/presidentModels');

exports.presidentMembers = async (req, res) => {
  const presidmembersdata = req.body;
  const Honorarymembers = new Forms(Honorarymembersdata);

  try{
    const honorarymembs = await Honorarymembers.save();
    res.status(201).json(honorarymembs);
  }

  catch(error) {
    res.staus(500).json ({message: 'Error...'});
  }
};


exports.getmembersdatas = async (req, res) => {
try{
  const membersdatas = await Forms.find();
  res.status(200).json(membersdatas);
}

catch (error) {
  res.status(500).json({ error: 'Failed to fetch form data' });
}
};