const mongoose = require("mongoose");

const { Schema } = mongoose;

const ruinsSchema = new Schema({
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

module.exports = mongoose.model("Ruins", ruinsSchema);