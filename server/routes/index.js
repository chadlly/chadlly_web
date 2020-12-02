var express = require('express');
var router = express.Router();
var path = require('path');
var mapservice = require("./maplogic/mapservice");

const Location = require("../model/location");
const Camping = require("../model/camping");
const Fishing = require("../model/fishing");
const Forest = require("../model/forest");
const Museum = require("../model/museum");
const Parking = require("../model/parking");
const Road = require("../model/road");
const Ruins = require("../model/ruins");
const Site = require("../model/site");
const Valley = require("../model/valley");
const User = require("../model/user");



/* GET home page. */

router.get("/chadlly", function(req,res,next){
  
  console.log("index page!");
  res.render("index");
});

router.post("/chadlly", function(req,res,next){
  
  var rating = req.body.rating;

  console.log("index page!");
  console.log(rating);
  res.render("index");
});


router.get("/chadlly/filter", function(req,res,next){

  res.render("filter");
});

router.post("/chadlly/filterResult", function(req,res,next){
  
  var lat = 36.5435;
  var lng = 127.21521;
  var select_city = req.body.city;
  var select_date = req.body.date;
  var select_timezone = req.body.timezone;
  var select_thema = req.body.thema;
  var select_headcount = req.body.headcount;
  var select_time = req.body.time;
  var select_place = req.body.place;
  var select_fee = req.body.fee;

  console.log(select_city);
  console.log(select_date);
  console.log(select_timezone);
  console.log(select_thema);
  console.log(select_headcount);
  console.log(select_time);
  console.log(select_place);
  console.log(select_fee);

  mapservice.makeFilteredCourse(lat, lng, select_time, select_place, function(course1,course2,course3){
    console.log(course1);
    console.log(course2);
    console.log(course3);
    res.render("filter_result", {course1: course1, course2: course2, course3: course3});
  });
});

router.post("/chadlly/filterDetail", function(req,res,next){

  res.render("filter_detail_page");
});

router.post("/chadlly/finalfilterDetail", function(req,res,next){

  res.render("filter_detail_page");
});

router.get("/chadlly/recommends", function(req,res,next){

  res.render("recommendation");
});

var firstlat;
var firstlng;

router.get("/chadlly/customize", function(req,res,next){
  console.log("customize");

  var lat = 37.50446;
  var lng = 126.95627;

  firstlat = lat;
  firstlng = lng;
  mapservice.getNearestPlacesFiltered(lat, lng, 3, function(length, result){
    console.log(length);
    console.log(result);
    res.render("customize", {curlat: lat, curlng: lng, l:result});
  })
  
});
var content1;
var content2;
var content3;

var lats = []
var lngs = []

router.post("/chadlly/customize1", function(req,res,next){
  console.log("customize");

  var nextlat = Number(req.body.nextlat);
  var nextlng = Number(req.body.nextlng);

  lats.push(nextlat);
  lngs.push(nextlng);

  content1 = req.body.content1;

  console.log(nextlat, nextlng, content1);

  mapservice.getNearestPlacesFiltered(nextlat, nextlng, 3, function(length, result){
    console.log(length);
    console.log(result);
    res.render("customize1", {curlat: nextlat, curlng: nextlng, l:result, content1: content1});
  })
  
});

router.post("/chadlly/customize2", function(req,res,next){
  console.log("customize");

  var nextlat = Number(req.body.nextlat);
  var nextlng = Number(req.body.nextlng);
  content2 = req.body.content2;

  lats.push(nextlat);
  lngs.push(nextlng);

  mapservice.getNearestPlacesFiltered(nextlat, nextlng, 3, function(length, result){
    console.log(length);
    console.log(result);
    res.render("customize2", {curlat: nextlat, curlng: nextlng, l:result, content1: content1, content2: content2});
  })
  
});



router.post("/chadlly/customizeDetail", function(req,res,next){

  var nextlat = Number(req.body.nextlat);
  var nextlng = Number(req.body.nextlng);
  content3 = req.body.content3;

  lats.push(nextlat);
  lngs.push(nextlng);

  console.log("server: ", lats);
  console.log("server: ", lngs);

  res.render("customize_detail", {start: "서울시 흑석동", content1: content1, content2: content2, content3 : content3, lats: lats, lngs: lngs});

});


module.exports = router;
