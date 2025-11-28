const Winner = require("../models/winnerModel");

// Create new winner independently (optional)
exports.createWinner = async (req, res) => {
    try {
        const winner = new Winner(req.body);
        const savedWinner = await winner.save();
        res.status(201).json(savedWinner);
    } catch (error) {
        res.status(400).json({ message: "Error creating winner", error: error.message });
    }
};

// Get all winners
exports.getAllWinners = async (req, res) => {
    try {
        const winners = await Winner.find();
        res.status(200).json(winners);
    } catch (error) {
        res.status(500).json({ message: "Error fetching winners", error: error.message });
    }
};

// Get single winner
exports.getWinnerById = async (req, res) => {
    try {
        const winner = await Winner.findById(req.params.id);
        if (!winner) return res.status(404).json({ message: "Winner not found" });
        res.status(200).json(winner);
    } catch (error) {
        res.status(500).json({ message: "Error fetching winner", error: error.message });
    }
};

// Update winner
exports.updateWinner = async (req, res) => {
    try {
        const updatedWinner = await Winner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWinner) return res.status(404).json({ message: "Winner not found" });
        res.status(200).json(updatedWinner);
    } catch (error) {
        res.status(400).json({ message: "Error updating winner", error: error.message });
    }
};

// Delete winner
exports.deleteWinner = async (req, res) => {
    try {
        const deletedWinner = await Winner.findByIdAndDelete(req.params.id);
        if (!deletedWinner) return res.status(404).json({ message: "Winner not found" });
        res.status(200).json({ message: "Winner deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting winner", error: error.message });
    }
};
