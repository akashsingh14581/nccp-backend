const mongoose = require('mongoose');

const ordinaryMemberSchema = new mongoose.Schema({
    id: {
        type: String,

    },
    name: {
        type: String,

    },
    address: {
        type: String,

    },
    state: {
        type: String,

    },
    status: {
        type: String,

    },
    phone: {
        type: String,

    },
    email: {
        type: String,

    }

}, { timestamps: true })

const ordinaryMemberModel = mongoose.model("OrdinaryMembers", ordinaryMemberSchema);
module.exports = ordinaryMemberModel;