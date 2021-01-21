const mongoose = require("mongoose");

const { Schema } = mongoose;

const locationSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },
    longitude: {
        type: Number,
        required: true,
        unique: false,
    },
    latitude: {
        type: Number,
        required: true,
        unique: false,
    },
    visitType: {
        type: String,
        required: true,
        unique: false,
    },
    weight: {
        type: Number,
        required: false,
        unique: false,
    },
})
module.exports = mongoose.model("Location", locationSchema);