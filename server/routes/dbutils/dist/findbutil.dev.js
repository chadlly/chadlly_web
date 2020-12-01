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

var Course = require("../../model/course");

var MongoClient = require("mongodb").MongoClient;

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
var courseCollection;

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
    userCollection = database.collection("user");
    categoryCollection = database.collection("category");
    campingCollection = database.collection("camping");
    fishingCollection = database.collection("fishing");
    forestCollection = database.collection("forest");
    museumCollection = database.collection("museum");
    parkingCollection = database.collection("parking");
    roadCollection = database.collection("road");
    ruinsCollection = database.collection("ruins");
    siteCollection = database.collection("site");
    valleyCollection = database.collection("valley");
    courseCollection = database.collection("course");
    console.log("db connected!");
    findMuseumByName("범패민속문화박물관", function (len, res) {
      console.log(res);
    });
  });
}

connectdb();

function findMuseumByName(queryName, callback) {
  console.log(queryName);
  museumCollection.find({
    name: queryName
  }).toArray(function (err, result) {
    if (err) {
      callback("dbOpenError", "none");
      throw err;
    }

    if (result.length > 0) {
      callback(result.length, result);
    } else {
      console.log('no entry in db');
      callback("error", "none");
    }
  });
}

function findCampingByName(queryName, callback) {
  console.log(queryName);
  campingCollection.find({
    name: queryName
  }).toArray(function (err, result) {
    if (err) {
      callback("dbOpenError", "none");
      throw err;
    }

    if (result.length > 0) {
      callback(result.length, result);
    } else {
      console.log('no entry in db');
      callback("error", "none");
    }
  });
}

function findFishingByName(queryName, callback) {
  console.log(queryName);
  fishingCollection.find({
    name: queryName
  }).toArray(function (err, result) {
    if (err) {
      callback("dbOpenError", "none");
      throw err;
    }

    if (result.length > 0) {
      callback(result.length, result);
    } else {
      console.log('no entry in db');
      callback("error", "none");
    }
  });
}

function findForestByName(queryName, callback) {
  console.log(queryName);
  forestCollection.find({
    name: queryName
  }).toArray(function (err, result) {
    if (err) {
      callback("dbOpenError", "none");
      throw err;
    }

    if (result.length > 0) {
      callback(result.length, result);
    } else {
      console.log('no entry in db');
      callback("error", "none");
    }
  });
}

function findParkingByName(queryName, callback) {
  console.log(queryName);
  parkingCollection.find({
    name: queryName
  }).toArray(function (err, result) {
    if (err) {
      callback("dbOpenError", "none");
      throw err;
    }

    if (result.length > 0) {
      callback(result.length, result);
    } else {
      console.log('no entry in db');
      callback("error", "none");
    }
  });
}

function findRoadByName(queryName, callback) {
  console.log(queryName);
  roadCollection.find({
    name: queryName
  }).toArray(function (err, result) {
    if (err) {
      callback("dbOpenError", "none");
      throw err;
    }

    if (result.length > 0) {
      callback(result.length, result);
    } else {
      console.log('no entry in db');
      callback("error", "none");
    }
  });
}

function findRuinsByName(queryName, callback) {
  console.log(queryName);
  ruinsCollection.find({
    name: queryName
  }).toArray(function (err, result) {
    if (err) {
      callback("dbOpenError", "none");
      throw err;
    }

    if (result.length > 0) {
      callback(result.length, result);
    } else {
      console.log('no entry in db');
      callback("error", "none");
    }
  });
}

function findSiteByName(queryName, callback) {
  console.log(queryName);
  siteCollection.find({
    name: queryName
  }).toArray(function (err, result) {
    if (err) {
      callback("dbOpenError", "none");
      throw err;
    }

    if (result.length > 0) {
      callback(result.length, result);
    } else {
      console.log('no entry in db');
      callback("error", "none");
    }
  });
}

function findValleyByName(queryName, callback) {
  console.log(queryName);
  valleyCollection.find({
    name: queryName
  }).toArray(function (err, result) {
    if (err) {
      callback("dbOpenError", "none");
      throw err;
    }

    if (result.length > 0) {
      callback(result.length, result);
    } else {
      console.log('no entry in db');
      callback("error", "none");
    }
  });
}

function saveUserData(userid, userpw, usrdate, usrtime, usrtheme, usrpeoplehead, usrtraveltime, usrinterest, wantprice, callback) {}

function saveCourse(inCourse, callback) {
  /*
  let newcourse = new Course({
      name: name,
      userinfo: userinfo,
      locations: locations,
      price: price,
      theme: theme,
  })
  */
  courseCollection.insertOne(inCourse, function (err, res) {
    if (err) {
      throw error;
    }

    console.log(inCourse);
    console.log("course data inserted");
    callback(err, res);
  });
}

module.exports.findCampingByName = findCampingByName;
module.exports.findFishingByName = findFishingByName;
module.exports.findForestByName = findForestByName;
module.exports.findMuseumByName = findMuseumByName;
module.exports.findParkingByName = findParkingByName;
module.exports.findRoadByName = findRoadByName;
module.exports.findRuinsByName = findRuinsByName;
module.exports.findSiteByName = findSiteByName;
module.exports.findValleyByName = findValleyByName;
module.exports.saveCourse = saveCourse;