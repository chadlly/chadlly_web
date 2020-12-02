var express = require('express');
var router = express.Router();
var path = require('path');
var mapservice = require("./maplogic/mapservice");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/map', function(req,res,next){

  console.log("hihi");

  console.log(path.join(__dirname + '/map/mainmap.html'));
  res.sendFile(path.join(__dirname + '/map/mainmap.html'));


});

router.get('/mapejs', function(req,res,next){

  mapservice.initTest();
  mapservice.printLocations();
  res.render("mainmap", {l: mapservice.getLocations()});

});

router.use('/chaduri', function(req, res, next){
  mapservice.initTest();
  mapservice.printLocations();

  res.render("mainmap", {l: mapservice.getLocations()});

})

router.post("/chaduri/search", function(req, res, next){
  
  var long = req.body.longitude;
  var lat = req.body.latitude;


  console.log(long);
  console.log(lat);

  res.render("map_showlocation.ejs", {lati: lat, longi: long});
})

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

router.get("/chadlly", function(req,res,next){

  res.render("index");
});



router.get("/chadlly/course", function(req,res,next){

  res.render("detailpage");
});


router.post("/chadlly/filter_result", function(req,res,next){

  res.render("filter_result");
});

router.get("/chadlly/recommends", function(req,res,next){

  res.render("recommendation");
});

router.get("/chadlly/customize", function(req,res,next){

  res.render("customize");
});




module.exports = router;
