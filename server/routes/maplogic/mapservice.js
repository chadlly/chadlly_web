const Location = require("../../model/location");
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
    
    findLocations();
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

function findLocations(){

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

function getNearestPlaces(lat, lng, callback){
    

}



function recommend(){
    
}









module.exports.initTest = initTest;
module.exports.printLocations = printLocations;
module.exports.getLocations = getLocations;