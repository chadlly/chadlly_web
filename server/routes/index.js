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
router.get("/chadlly/filter_result", function(req,res,next){

  res.render("filter_result");
});

router.post("/chadlly/filterDetail", function(req,res,next){

  res.render("filter_detail_page");
});

router.get("/chadlly/recommends", function(req,res,next){

  res.render("recommendation");
});

router.get("/chadlly/customize", function(req,res,next){
  console.log("customize");

  var test = [];
  test.push("진원이집");
  test.push("노x현이집");
  test.push("wogud의짐");
  test.push("xx의짐");
  console.log(test);

  res.render("customize", {curlat: "36.43453", curlng: "127.24231", l:test});
});




module.exports = router;
