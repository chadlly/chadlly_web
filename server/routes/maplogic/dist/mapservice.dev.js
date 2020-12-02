"use strict";

var Location = require("../../model/location");

var Camping = require("../../model/camping");

var Fishing = require("../../model/fishing");

var Forest = require("../../model/forest");

var Museum = require("../../model/museum");

var Parking = require("../../model/parking");

var Road = require("../../model/road");

var Ruins = require("../../model/ruins");

var Site = require("../../model/site");

var Valley = require("../../model/valley");

var User = require("../../model/user");

var dbutil = require("../dbutils/findbutil");

var Course = require("../../model/course");

var MongoClient = require("mongodb").MongoClient; // db collections variable


var database;
var userCollection;
var categoryCollection;
var campingCollection;
var fishingCollection;
var forestCollection;
var museumCollection;
var parkingCollection;
var roadCollection;
var ruinsCollection;
var siteCollection;
var valleyCollection;
var courseCollection; // end
// db connect code

function connectdb() {
  var databaseUrl = "mongodb+srv://Chaduri:heychaduri@cluster0.ggtbm.mongodb.net/db?retryWrites=true&w=majority";
  MongoClient.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err, db) {
    if (err) {
      console.log(' database error !');
      return;
    }

    console.log('DB:: connect to ' + databaseUrl);
    database = db.db('db');
    categoryCollection = database.collection("category");
    console.log("db connected!");
    getNearestPlaces(37.504104, 126.956710, 1, function (msg, res) {
      console.log(msg);
    });
  });
}

connectdb();
var location;
var locations = [];
var travelLocations;

function initTest() {
  for (var i = 0; i < 5; i++) {
    var loctemp = new Location({
      name: "temp" + i,
      longitude: 37.503774 + i,
      latitude: 126.955858,
      visitType: "학교"
    });
    locations.push(loctemp);
  }
}

function printLocations() {
  for (var i = 0; i < locations.length; i++) {
    console.log(locations[i]);
  }
}

function getLocations() {
  return locations;
}

function getAllLocation() {
  categoryCollection.find({}).toArray(function (err, result) {
    if (err) {
      callback("dbOpenError", "none");
      throw err;
    }

    if (result.length > 0) {
      //console.log(result);
      //callback("", result);
      travelLocations = result;
      console.log(travelLocations);
    } else {
      console.log('no entry in db');
      callback("error", "none");
    }
  });
} // conversion rules
//1. 0.1 lat diff => 11 km approx. -> we set to 10
//2. 0.1 lng diff => 9 km approx. -> we set to 10


function getDistance(lat1, lng1, lat2, lng2, callback) {}

function getNearestPlaces(lat, lng, userPref, callback) {
  // lat, lng, userpref(1~3), 30km, 60km, 90km
  var latdiff, lngdiff;

  if (userPref == 1) {
    latdiff = 0.3;
    lngdiff = 0.3;
  } else if (userPref == 2) {
    latdiff = 0.6;
    lngdiff = 0.6;
  } else if (userPref == 3) {
    latdiff = 0.9;
    lngdiff = 0.9;
  } // access db


  categoryCollection.find({
    latitude: {
      $gt: lat - latdiff,
      $lt: lat + latdiff
    },
    longitude: {
      $gt: lng - lngdiff,
      $lt: lng + lngdiff
    }
  }).toArray(function (err, result) {
    if (err) {
      callback("dbOpenError", "none");
      throw err;
    }

    if (result.length > 0) {
      //console.log(result);
      //callback("", result);
      travelLocations = result;
      console.log(travelLocations);
      callback(result.length, result);
    } else {
      console.log('no entry in db');
      callback("error", "none");
    }
  });
}

function recommend(usrdate, usrtime, usrtheme, usrpeoplehead, usrtraveltime, usrinterest, wantprice) {}

function applyInterestFilter(usrinterest, usrnointerest, callback) {
  // linear search
  var filteredLocations = [];
  console.log("travel locations number : ", travelLocations.length);

  for (var i = 0; i < travelLocations.length; i++) {
    if (travelLocations[i].visitType == usrinterest) {
      travelLocations[i].weight = 3;
      filteredLocations.push(travelLocations[i]);
    } else if (travelLocations[i].visitType == usrnointerest) {
      travelLocations[i].weight = 0;
      filteredLocations.push(travelLocations[i]);
    } else {
      // no prefer
      travelLocations[i].weight = 1;
      filteredLocations.push(travelLocations[i]);
    }
  }

  callback(filteredLocations.length, filteredLocations);
}

function fetchRecommends(filteredLocations, callback) {}

function makeTestRecommends(callback) {
  var testlocations = [];
  testlocations.push(travelLocations[4]);
  testlocations.push(travelLocations[7]);
  testlocations.push(travelLocations[10]);
  var testuser = new User({
    region: "동작구 흑석동",
    latitude: 37.42421,
    longitude: 126.56342,
    date: "2020/12/01",
    time: "2",
    theme: "데이트",
    peoplehead: 3,
    traveltime: "3",
    interest: "박물관",
    nointerest: "계곡",
    wantprice: "5000"
  });
  var testprice = testuser.price;
  var testtheme = testuser.theme;
  var testCourse = new Course({
    name: "테스트 드라이브 코스",
    userinfo: testuser,
    locations: testlocations,
    price: testprice,
    theme: testtheme,
    rating: 0
  });
  dbutil.saveCourse(testCourse, function (err, result) {
    callback(testCourse);
  });
}

module.exports.initTest = initTest;
module.exports.printLocations = printLocations;
module.exports.getLocations = getLocations;
module.exports.makeTestRecommends = makeTestRecommends;