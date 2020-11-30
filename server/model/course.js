const mongoose = require("mongoose");

const User = require("./user").schema;

const { Schema } = mongoose;

const courseSchema = new Schema({

    userinfo: {
        type: User,
        required: true,
        unique: true,
    },

    locations: {
        type: [],
        required: true,
        unique: false,
    },

})

module.exports = mongoose.model("Course", courseSchema);
