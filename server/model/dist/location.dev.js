"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var locationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  longitude: {
    type: Number,
    required: true,
    unique: false
  },
  latitude: {
    type: Number,
    required: true,
    unique: false
  },
  visitType: {
    type: String,
    required: true,
    unique: false
  }
});
module.exports = mongoose.model("Location", locationSchema);