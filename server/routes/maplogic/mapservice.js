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

function findCampingBy(mongoQuery){
    campingCollection.find({mongoQuery}).toArray(function(err, result){
        if(err){
            callback("dbOpenError", "none");
            throw err;
        }
        if(result.length > 0){
            //console.log(result);
            //callback("", result);
            console.log(result.length, result);
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





module.exports.initTest = initTest;
module.exports.printLocations = printLocations;
module.exports.getLocations = getLocations;