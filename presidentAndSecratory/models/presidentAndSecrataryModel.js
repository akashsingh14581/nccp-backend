const mongoose = require('mongoose');

// Schema define kar rahe hain
const presidentAndSecratorySchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
        trim: true
    },
    president: {
        type: String,
        required: true,
        trim: true
    },
    secretary: { // spelling fix: 'secratory' → 'secretary'
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Model create kar rahe hain
const PresidentAndSecretary = mongoose.model('PresidentAndSecretary', presidentAndSecratorySchema);

// Export kar rahe hain
module.exports = PresidentAndSecretary;
