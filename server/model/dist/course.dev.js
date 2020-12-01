"use strict";

var mongoose = require("mongoose");

var User = require("./user").schema;

var Schema = mongoose.Schema;
var courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  userinfo: {
    type: User,
    required: true,
    unique: false,
    "default": {}
  },
  locations: {
    type: [],
    required: true,
    unique: false
  },
  price: {
    type: String,
    required: false,
    unique: false
  },
  theme: {
    type: String,
    required: true,
    unique: false
  },
  rating: {
    type: Number,
    required: false,
    unique: false
  }
});
module.exports = mongoose.model("Course", courseSchema);