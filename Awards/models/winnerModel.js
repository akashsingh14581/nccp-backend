const mongoose = require('mongoose');
const winnerSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String
    }
})

module.exports = mongoose.model('Winner', winnerSchema)