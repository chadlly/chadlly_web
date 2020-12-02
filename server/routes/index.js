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

router.get("/chadlly/main", function(req,res,next){
  
  res.render('main');
});

router.get("/chadlly/filter", function(req,res,next){

  res.render("filter");
});

router.post("/chadlly/filter_result", function(req,res,next){

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

  res.render("filter_result");
});

router.post("/chadlly/filterDetail1", function(req,res,next){

  res.render("filter_detail_page");
});

router.post("/chadlly/filterDetail2", function(req,res,next){

  res.render("filter_detail_page");
});

router.post("/chadlly/filterDetail3", function(req,res,next){

  res.render("filter_detail_page");
});

router.get("/chadlly/recommends", function(req,res,next){

  res.render("recommendation");
});

router.get("/chadlly/customize", function(req,res,next){
  console.log("customize");

  var lat = 37.50446;
  var lng = 126.95627;

  mapservice.getNearestPlacesFiltered(lat, lng, 1, function(length, result){
    console.log(length);
    console.log(result);
    res.render("customize", {curlat: lat, curlng: lng, l:result});
  })
  
});

router.post("/chadlly/customizeDetail", function(req,res,next){

  res.render("customize_detail");
});


module.exports = router;
