const mongoose = require("mongoose");

const { Schema } = mongoose;

const museumSchema = new Schema({
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
    website: {
        type: String,
        required: true,
        unique: true,
    },
    start_time: {
        type: String,
        required: true,
        unique: true,
    },
    end_time: {
        type: String,
        required: true,
        unique: true,
    },
    start_time_holiday: {
        type: String,
        required: true,
        unique: true,
    },
    end_time_holiday: {
        type: String,
        required: true,
        unique: true,
    },
    holiday: {
        type: String,
        required: true,
        unique: true,
    },
    charge_adult: {
        type: Number,
        required: true,
        unique: true,
    },
    charge_teen: {
        type: Number,
        required: true,
        unique: true,
    },
    charge_kid: {
        type: Number,
        required: true,
        unique: true,
    },
    feature: {
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

module.exports = mongoose.model("Museum", museumSchema);