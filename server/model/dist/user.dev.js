"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var userSchema = new Schema({
  currentPlace: {
    region: {
      type: String,
      required: true,
      unique: true
    },
    latitude: {
      type: Number,
      require: false,
      unique: false
    },
    longitude: {
      type: Number,
      require: false,
      unique: false
    }
  },
  date: {
    type: String,
    require: false,
    unique: false
  },
  time: {
    type: String,
    require: true,
    unique: false
  },
  theme: {
    type: String,
    require: true,
    unique: false
  },
  peoplehead: {
    type: Number,
    require: true,
    unique: false
  },
  traveltime: {
    type: String,
    required: true,
    unique: false
  },
  interest: {
    type: String,
    required: true,
    unique: false
  },
  nointerest: {
    type: String,
    required: true,
    unique: false
  },
  wantprice: {
    type: String,
    required: true,
    unique: false
  }
});
module.exports = mongoose.model("Location", locationSchema);