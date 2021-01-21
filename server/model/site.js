const mongoose = require("mongoose");

const { Schema } = mongoose;

const siteSchema = new Schema({
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
    convenience: {
        type: String,
        required: true,
        unique: true,
    },
    culture_facility: {
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

module.exports = mongoose.model("Site", siteSchema);