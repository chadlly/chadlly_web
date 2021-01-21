const mongoose = require("mongoose");

const { Schema } = mongoose;

const roadSchema = new Schema({
    name: {
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
    tree: {
        type: String,
        required: true,
        unique: true,
    },
    length: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
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

module.exports = mongoose.model("Road", roadSchema);