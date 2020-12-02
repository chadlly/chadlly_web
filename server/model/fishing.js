const mongoose = require("mongoose");

const { Schema } = mongoose;

const fishingSchema = new Schema({
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
    address: {
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
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    area: {
        type: Number,
        required: true,
        unique: true,
    },
    fish: {
        type: String,
        required: true,
        unique: true,
    },
    max_capacity: {
        type: Number,
        required: true,
        unique: true,
    },
    charge: {
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

module.exports = mongoose.model("Fishing", fishingSchema);