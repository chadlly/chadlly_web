var express = require('express');
var router = express.Router();
var path = require('path');
var mapservice = require("./maplogic/mapservice");



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

  mapservice.makeFilteredCourse(lat, lng, select_time, select_place, function(length, result){
    console.log(result);
    res.render("filter_result", {course: result});
  });
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

  res.render("customize");
});

router.post("/chadlly/customizeDetail", function(req,res,next){

  res.render("customize_detail");
});


module.exports = router;
