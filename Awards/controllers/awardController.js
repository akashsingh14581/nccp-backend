const Award = require("../models/awardsModel");
const Winner = require("../models/winnerModel");

// Create Award + winners together
exports.createAwardWithWinners = async (req, res) => {
    try {
        const { awardName, awardDescription, orationDetails, extraInfo, winners } = req.body;

        // 1️⃣ Winners create karna
        const winnerDocs = await Winner.insertMany(winners); // array of winner objects
        const winnerIds = winnerDocs.map(w => w._id);

        // 2️⃣ Award create karna with winner references
        const award = new Award({
            awardName,
            awardDescription,
            orationDetails,
            extraInfo,
            winners: winnerIds
        });

        const savedAward = await award.save();

        // 3️⃣ Response
        const populatedAward = await savedAward.populate("winners");
        res.status(201).json(populatedAward);

    } catch (error) {
        res.status(400).json({ message: "Error creating award with winners", error: error.message });
    }
};

// Get all awards (with winners populated)
exports.getAllAwards = async (req, res) => {
    try {
        const awards = await Award.find().populate("winners");
        res.status(200).json(awards);
    } catch (error) {
        res.status(500).json({ message: "Error fetching awards", error: error.message });
    }
};

// Get single award by ID
exports.getAwardById = async (req, res) => {
    try {
        const award = await Award.findById(req.params.id).populate("winners");
        if (!award) return res.status(404).json({ message: "Award not found" });
        res.status(200).json(award);
    } catch (error) {
        res.status(500).json({ message: "Error fetching award", error: error.message });
    }
};

// Update award details
exports.updateAward = async (req, res) => {
    try {
        const { awardName, awardDescription, orationDetails, extraInfo, winners } = req.body;

        // Existing award fetch karo
        const award = await Award.findById(req.params.id);
        if (!award) return res.status(404).json({ message: "Award not found" });

        // Purane winners delete karo agar naye set kar rahe ho
        await Winner.deleteMany({ _id: { $in: award.winners } });

        // Naye winners insert karo
        const winnerDocs = await Winner.insertMany(winners);
        const winnerIds = winnerDocs.map(w => w._id);

        // Award update
        award.awardName = awardName;
        award.awardDescription = awardDescription;
        award.orationDetails = orationDetails;
        award.extraInfo = extraInfo;
        award.winners = winnerIds;

        const savedAward = await award.save();
        const populatedAward = await savedAward.populate("winners");

        res.status(200).json(populatedAward);

    } catch (error) {
        res.status(400).json({ message: "Error updating award", error: error.message });
    }
};



// Delete award
exports.deleteAward = async (req, res) => {
    try {
        const award = await Award.findById(req.params.id);
        if (!award) return res.status(404).json({ message: "Award not found" });

        // Delete winners linked to this award
        await Winner.deleteMany({ _id: { $in: award.winners } });

        // Delete the award
        await Award.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Award and its winners deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting award", error: error.message });
    }
};

