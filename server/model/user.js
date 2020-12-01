const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({

    currentPlace: {

        region : {
            type: String,
            required: true,
            unique: true,
        },

        latitude: {
            type: Number,
            require: false,
            unique: false,
        },

        longitude: {
            type: Number,
            require: false,
            unique: false,
        },
    },

    date: {
        type: String,
        require: false,
        unique: false,
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
})

module.exports = mongoose.model("Location", locationSchema);