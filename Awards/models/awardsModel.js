const mongoose = require('mongoose');
const awardSchema = new mongoose.Schema({
    awardName: {
        type: String,
        required: true
    },
    awardDescription: {
        type: String,
        required: true
    },
    orationDetails: {
        type: String,
    },
    extraInfo: {
        type: String,
    },
    winners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Winner'

    }]
})

module.exports = mongoose.model("Award", awardSchema)