const Location = require("../../model/location");
const Camping = require("../../model/camping");
const Fishing = require("../../model/fishing");
const Forest = require("../../model/forest");
const Museum = require("../../model/museum");
const Parking = require("../../model/parking");
const Road = require("../../model/road");
const Ruins = require("../../model/ruins");
const Site = require("../../model/site");
const Valley = require("../../model/valley");
const User = require("../../model/user");

const dbutil = require("../dbutils/findbutil");
const Course = require("../../model/course");

var MongoClient = require("mongodb").MongoClient;
// db collections variable
let database;
var userCollection;
var categoryCollection;
let campingCollection;
let fishingCollection;
let forestCollection;
let museumCollection;
let parkingCollection;
let roadCollection;
let ruinsCollection;
let siteCollection;
let valleyCollection;
let courseCollection;
// end
// db connect code

function connectdb(){
    let databaseUrl = "mongodb+srv://Chaduri:heychaduri@cluster0.ggtbm.mongodb.net/db?retryWrites=true&w=majority";
    MongoClient.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err,db){
    if(err){
        console.log(' database error !');
        return; 
    }
    
    console.log('DB:: connect to ' + databaseUrl);
    database = db.db('db');
    
    categoryCollection = database.collection("category");
    
    console.log("db connected!");
    
    getNearestPlaces(37.504104, 126.956710, 1, function(msg, res){
        console.log(msg);
    });

    });
}

connectdb();


let location;

let locations = [];
let travelLocations;

function initTest(){

    for(var i =0; i < 5; i++){
        var loctemp = new Location({
            name : "temp"+i,
            longitude : 37.503774+i,
            latitude : 126.955858,
            visitType: "학교"
        })

        locations.push(loctemp);
    }
}

function printLocations(){

    for(var i = 0; i < locations.length; i++){
        console.log(locations[i]);
    }
}

function getLocations(){
    return locations;
}

function getAllLocation(){
    categoryCollection.find({}).toArray(function(err, result){
        if(err){
            callback("dbOpenError", "none");
            throw err;
        }
        if(result.length > 0){
            //console.log(result);
            //callback("", result);

            travelLocations = result;
            console.log(travelLocations);
        }else{
            console.log('no entry in db');
            callback("error", "none");
        }
    })
}



// conversion rules
//1. 0.1 lat diff => 11 km approx. -> we set to 10
//2. 0.1 lng diff => 9 km approx. -> we set to 10


function getDistance(lat1, lng1, lat2, lng2, callback){
    

}


function getNearestPlaces(lat, lng, userPref, callback){
    // lat, lng, userpref(1~3), 30km, 60km, 90km
    let latdiff, lngdiff;
    if(userPref == 1){
        latdiff = 0.3;
        lngdiff = 0.3;
    }
    else if(userPref == 2){
        latdiff = 0.6;
        lngdiff = 0.6;
    }
    else if(userPref == 3){
        latdiff = 0.9;
        lngdiff = 0.9;
    }

    // access db

    categoryCollection.find({latitude : {$gt: lat - latdiff, $lt: lat + latdiff}, 
        longitude: {$gt: lng - lngdiff, $lt: lng + lngdiff}}).toArray(function(err, result){
        if(err){
            callback("dbOpenError", "none");
            throw err;
        }
        if(result.length > 0){
            //console.log(result);
            //callback("", result);
            travelLocations = result;
            console.log(travelLocations);
            callback(result.length, result);
        }else{
            console.log('no entry in db');
            callback("error", "none");
        }
    })
}



function recommend(usrdate, usrtime, usrtheme, usrpeoplehead, usrtraveltime, usrinterest, wantprice){
    



}

function applyInterestFilter(usrinterest, usrnointerest, callback){
    // linear search
    let filteredLocations = [];
    console.log("travel locations number : ", travelLocations.length);
    for(let i =0; i < travelLocations.length; i++){
        
        if(travelLocations[i].visitType == usrinterest){
            travelLocations[i].weight = 3;
            filteredLocations.push(travelLocations[i]);
        }
        else if(travelLocations[i].visitType == usrnointerest){
            travelLocations[i].weight = 0;
            filteredLocations.push(travelLocations[i]);
        }
        else{ // no prefer
            travelLocations[i].weight = 1;
            filteredLocations.push(travelLocations[i]);
        }
    }

    callback(filteredLocations.length, filteredLocations);
}

function fetchRecommends(filteredLocations, callback){

    
}

function makeTestRecommends(callback){
    
    let testlocations = []
    testlocations.push(travelLocations[4]);
    testlocations.push(travelLocations[7]);
    testlocations.push(travelLocations[10]);
    let testuser = new User({
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
        wantprice: "5000",
    });
    
    let testprice = testuser.price;
    let testtheme = testuser.theme;
    let testCourse = new Course({
        name: "테스트 드라이브 코스",
        userinfo: testuser,
        locations: testlocations,
        price: testprice,
        theme: testtheme,
    });

    dbutil.saveCourse(testCourse, function(err, result){
        callback(testCourse);
    });

}




module.exports.initTest = initTest;
module.exports.printLocations = printLocations;
module.exports.getLocations = getLocations;
module.exports.makeTestRecommends = makeTestRecommends;