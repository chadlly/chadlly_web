"use strict";

var express = require('express');

var router = express.Router();

var path = require('path');

var mapservice = require("./maplogic/mapservice");
/* GET home page. */


router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/map', function (req, res, next) {
  console.log("hihi");
  console.log(path.join(__dirname + '/map/mainmap.html'));
  res.sendFile(path.join(__dirname + '/map/mainmap.html'));
});
router.get('/mapejs', function (req, res, next) {
  mapservice.initTest();
  mapservice.printLocations();
  res.render("mainmap", {
    l: mapservice.getLocations()
  });
});
router.use('/chaduri', function (req, res, next) {
  mapservice.initTest();
  mapservice.printLocations();
  res.render("mainmap", {
    l: mapservice.getLocations()
  });
});
router.post("/chaduri/search", function (req, res, next) {
  var _long = req.body.longitude;
  var lat = req.body.latitude;
  console.log(_long);
  console.log(lat);
  res.render("map_showlocation.ejs", {
    lati: lat,
    longi: _long
  });
});
router.get("/chadlly", function (req, res, next) {
  console.log("index page!");
  res.render("index");
});
router.get("/chadlly/main", function (req, res, next) {
  console.log("main page!");
  res.render('main');
});
router.get("/chadlly/filter", function (req, res, next) {
  console.log("search page");
  res.render("filter");
});
module.exports = router;