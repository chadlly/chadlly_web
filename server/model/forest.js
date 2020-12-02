const mongoose = require("mongoose");

const { Schema } = mongoose;

const forestSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
        unique: true,
    },
    max_capacity: {
        type: String,
        required: true,
        unique: true,
    },
    charge: {
        type: String,
        required: true,
        unique: true,
    },
    staying: {
        type: String,
        required: true,
        unique: true,
    },
    facility: {
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
    latitude: {
        type: Number,
        required: true,
        unique: true,
    },
    longitude: {
        type: Number,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        unique: true,
    },
})

module.exports = mongoose.model("Forest", forestSchema);