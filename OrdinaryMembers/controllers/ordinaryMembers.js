const ordinaryMemberModel = require('../model/ordinaryMember');

// ✅ Create Ordinary Member
exports.createOrdinaryMember = async (req, res) => {
    try {
        const { id, name, address, state, status, phone, email } = req.body;

        // Check if email already exists
        const existingMember = await ordinaryMemberModel.findOne({ email });
        if (existingMember) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newMember = new ordinaryMemberModel({
            id,
            name,
            address,
            state,
            status,
            phone,
            email,
        });

        await newMember.save();
        res.status(201).json({ message: "Ordinary member created successfully", data: newMember });
    } catch (error) {
        console.error("Error creating ordinary member:", error);
        res.status(500).json({ message: "Error creating member" });
    }
};

// ✅ Update Ordinary Member by ID
exports.updateOrdinaryMemberById = async (req, res) => {
    try {
        const { id } = req.params; // member ID from URL
        const { email, ...updatedData } = req.body;

        // Check if email already exists in another record
        if (email) {
            const existingMember = await ordinaryMemberModel.findOne({ email, _id: { $ne: id } });
            if (existingMember) {
                return res.status(400).json({ message: "Email already exists for another member" });
            }
        }

        const updatedMember = await ordinaryMemberModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        if (!updatedMember) {
            return res.status(404).json({ message: "Member not found" });
        }

        res.status(200).json({ message: "Member updated successfully", data: updatedMember });
    } catch (error) {
        console.error("Error updating member:", error);
        res.status(500).json({ message: "Error updating member data" });
    }
};

// ✅ Upload Excel Data for Ordinary Members
exports.uploadOrdinaryExcel = async (req, res) => {
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
            id: member.id,
            name: member.name,
            address: member.address,
            state: member.state,
            status: member.status,
            phone: member.phone,
            email: member.email,
        }));

        await ordinaryMemberModel.insertMany(membersData);
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data to DB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllOrdinaryMembers = async (req, res) => {
    try {
        // Fetch all members from MongoDB
        const members = await ordinaryMemberModel.find().sort({ createdAt: -1 });

        // Agar data mil gaya to response bhej do
        res.status(200).json({
            success: true,
            count: members.length,
            data: members
        });
    } catch (error) {
        console.error('Error fetching ordinary members:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while fetching ordinary members'
        });
    }
};


exports.deleteOrdinaryMemberById = async (req, res) => {
    try {
        // fetch id 
        const { id } = req.params;
        // validation
        const existingMember = await ordinaryMemberModel.findByIdAndDelete(id);
        if (!existingMember) {
            return res.status(400).json({
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



