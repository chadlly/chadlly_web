const mongoose = require("mongoose");

const { Schema } = mongoose;

const valleySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    holiday: {
        type: String,
        required: true,
        unique: true,
    },
    using_time: {
        type: String,
        required: true,
        unique: true,
    },
    parking: {
        type: String,
        required: true,
        unique: true,
    },
    surrounding: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        unique: true,
    },
})

module.exports = mongoose.model("Valley", valleySchema);