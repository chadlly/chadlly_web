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
router.get("/chadlly/filter/search", function (req, res, next) {
  console.log("search page!");
  res.render("search");
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
router.get("/chadlly/course", function (req, res, next) {
  console.log("course page");
  mapservice.makeTestRecommends(function (result) {
    res.render("detailpage", {
      course: result
    });
  });
});
module.exports = router;