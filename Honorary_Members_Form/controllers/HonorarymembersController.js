const Forms = require("../models/HonorarymembersModels");

// POST: Create a new honorary member
exports.Honorarymembers = async (req, res) => {
  const Honorarymembersdata = req.body;
  const Honorarymembers = new Forms(Honorarymembersdata);

  try {
    const honorarymembs = await Honorarymembers.save();
    res.status(201).json(honorarymembs);
  } catch (error) {
    res.status(500).json({ message: "Error creating honorary member" });
  }
};

// GET: Fetch all honorary members
exports.getmembersdatas = async (req, res) => {
  try {
    const membersdatas = await Forms.find({}).sort({ createdAt: -1 });
    res.status(200).json(membersdatas);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch honorary members" });
  }
};

// PUT: Update an honorary member by ID
exports.updateHonoraryMember = async (req, res) => {
  const { id } = req.params;
  const updatedMember = req.body;
  console.log(`Updating member with ID: ${req.params.id}`);
  console.log(`Updated data: `, req.body);

  try {
    const result = await Forms.findByIdAndUpdate(id, updatedMember, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json({ message: "Member updated successfully", result });
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ message: "Error updating member", error });
  }
};

exports.deleteHonoraryMemberById = async (req, res) => {
  try {
    // fetch id 
    const { id } = req.params;
    // validation
    const existingMember = await Forms.findByIdAndDelete(id);
    if (!existingMember) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "member deleted successfully from database",
      data: existingMember
    })
  } catch (error) {
    console.error("getting an while deleting Ordinary Member", error);
    return res.status(500).json({
      success: false,
      message: "getting an while deleting Ordinary Member",
      error: error.message,
    })
  }
}

exports.uploadHonoraryMembersExcel = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debug

    if (!req.body.honoraryMembers) {
      return res.status(400).json({ error: 'Missing chapters in request body' });
    }

    // Map incoming Excel data to backend fields
    const chaptersData = req.body.honoraryMembers.map(member => ({
      id: member.id,
      name: member.name,
      address: member.address,
      state: member.state,
      status: member.status,
      phone: member.phone,
      email: member.email,
    }));

    console.log('Honorary Members Data:', chaptersData);

    // Save to DB (change model to HonoraryMembers)
    await Forms.insertMany(chaptersData);

    res.status(200).json({ message: 'Honorary members saved successfully' });
  } catch (error) {
    console.error('Error saving honorary members to DB:', error);
    res.status(500).json({
      message:"Internal server error",
      error: error.message 
    });
  }
};

