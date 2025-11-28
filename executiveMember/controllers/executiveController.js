const ExecutiveMember = require('../models/executiveModels.js');

exports.membersForm = async (req, res) => {
  const formData = req.body;
  const memberData = new ExecutiveMember(formData);

  try {
    const executiveForm = await memberData.save();
    res.status(201).json(executiveForm);
  }

  catch (error) {
    res.status(500).json({ message: 'Error...' });
  }
};


exports.getexecutivemembers = async (req, res) => {
  try {
    const executiveMemberData = await ExecutiveMember.find().sort({ createdAt: -1 });
    res.status(200).json(executiveMemberData);
  }

  catch (error) {
    res.status(500).json({ error: 'Failed to fetch form data' });
  }
};

exports.executiveMemberUpdateById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ 1. ID check
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID missing for updating executive member"
      });
    }

    // ✅ 2. Request body data lo
    const { name, email, position, address, phone } = req.body;

    // ✅ 3. Check if record exists
    const existingMember = await ExecutiveMember.findById(id);
    if (!existingMember) {
      return res.status(404).json({
        success: false,
        message: "Executive member not found"
      });
    }

    // ✅ 4. Update the record
    const updatedMember = await ExecutiveMember.findByIdAndUpdate(
      id,
      { name, email, position, address, phone },
      { new: true } // new:true → updated document return karega
    );

    // ✅ 5. Response send karo
    res.status(200).json({
      success: true,
      message: "Executive member updated successfully",
      data: updatedMember
    });

  } catch (error) {
    console.error("Error updating executive member:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating executive member",
      error: error.message
    });
  }
};


exports.executiveMemberDeleteById = async (req, res) => {
  try {
    const { id } = req.params;

    // 🧩 Step 1: Check if ID diya gaya hai ya nahi
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID missing for deleting executive member",
      });
    }

    // 🧩 Step 2: Delete the record from database
    const deletedMember = await ExecutiveMember.findByIdAndDelete(id);

    // 🧩 Step 3: Agar member nahi mila
    if (!deletedMember) {
      return res.status(404).json({
        success: false,
        message: "Executive member not found",
      });
    }

    // 🧩 Step 4: Agar delete ho gaya
    res.status(200).json({
      success: true,
      message: "Executive member deleted successfully",
      deletedMember,
    });

  } catch (error) {
    console.error("Error deleting executive member:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete executive member",
      error: error.message,
    });
  }
};

exports.uploadExecutiveExcel = async (req, res) => {
    try {
        let members = req.body.members;

        // Agar single object bheja gaya ho to usko array bana do
        if (!Array.isArray(members)) {
            members = [members];
        }

        if (!members || members.length === 0) {
            return res.status(400).json({ error: 'Missing or invalid members in request body' });
        }

        const membersData = members.map(member => ({
            name: member.name,
            email: member.email,
            phone: member.phone,
            position: member.position,
            address: member.address,
        }));

        await ExecutiveMember.insertMany(membersData);
        res.status(200).json({ message: 'Executive members data saved successfully' });
    } catch (error) {
        console.error('Error saving executive members data to DB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};