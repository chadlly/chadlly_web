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

let database;
var userCollection;
let categoryCollection;
let campingCollection;
let fishingCollection;
let forestCollection;
let museumCollection;
let parkingCollection;
let roadCollection;
let ruinsCollection;
let siteCollection;
let valleyCollection;


function connectdb(callback) {
    console.log("start");
    let databaseUrl = "mongodb+srv://Chaduri:heychaduri@cluster0.ggtbm.mongodb.net/db?retryWrites=true&w=majority";
    MongoClient.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) {
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
        testCollection = database.collection("test");
        testCollection2 = database.collection("test2");
        callback();
    })
}

function findCategoryByRange({ lat, latdiff, lng, lngdiff }, callback) {
    var db, total = [], total2 = [], s1, s2, closed = [false];
    
    s1 = campingCollection.find({
        latitude: { $gt: lat - latdiff, $lt: lat + latdiff },
        longitude: { $gt: lng - lngdiff, $lt: lng + lngdiff }
    }).toArray(function (err, result) {
        if (err) {
            callback("dbOpenError", "none");
            throw err;
        }
        if (result.length > 0) {
            total.push(result);
        } else {
            console.log('no entry in db');
            //callback("error", "none");
        }
        
        s2 = fishingCollection.find({
            latitude: { $gt: lat - latdiff, $lt: lat + latdiff },
            longitude: { $gt: lng - lngdiff, $lt: lng + lngdiff }
        }).toArray(function (err, result) {
            if (err) {
                callback("dbOpenError", "none");
                throw err;
            }
            if (result.length > 0) {
                total.push(result);
            } else {
                console.log('no entry in db');
                //callback("error", "none");
            }
            
            s3 = forestCollection.find({
                latitude: { $gt: lat - latdiff, $lt: lat + latdiff },
                longitude: { $gt: lng - lngdiff, $lt: lng + lngdiff }
            }).toArray(function (err, result) {
                if (err) {
                    callback("dbOpenError", "none");
                    throw err;
                }
                if (result.length > 0) {
                    total.push(result);
                } else {
                    console.log('no entry in db');
                    //callback("error", "none");
                }
                
                s4 = museumCollection.find({
                    latitude: { $gt: lat - latdiff, $lt: lat + latdiff },
                    longitude: { $gt: lng - lngdiff, $lt: lng + lngdiff }
                }).toArray(function (err, result) {
                    if (err) {
                        callback("dbOpenError", "none");
                        throw err;
                    }
                    if (result.length > 0) {
                        total.push(result);
                        
                        //console.log(result);
                    } else {
                        console.log('no entry in db');
                        //callback("error", "none");
                    }
                    //console.log(total[]);
                    s5 = roadCollection.find({
                        latitude: { $gt: lat - latdiff, $lt: lat + latdiff },
                        longitude: { $gt: lng - lngdiff, $lt: lng + lngdiff }
                    }).toArray(function (err, result) {
                        if (err) {
                            callback("dbOpenError", "none");
                            throw err;
                        }
                        if (result.length > 0) {
                            total.push(result);
                        } else {
                            console.log('no entry in db');
                            //callback("error", "none");
                        }
                        s6 = ruinsCollection.find({
                            latitude: { $gt: lat - latdiff, $lt: lat + latdiff },
                            longitude: { $gt: lng - lngdiff, $lt: lng + lngdiff }
                        }).toArray(function (err, result) {
                            if (err) {
                                callback("dbOpenError", "none");
                                throw err;
                            }
                            if (result.length > 0) {
                                total.push(result);
                            } else {
                                console.log('no entry in db');
                                //callback("error", "none");
                            }
                            s7 = siteCollection.find({
                                latitude: { $gt: lat - latdiff, $lt: lat + latdiff },
                                longitude: { $gt: lng - lngdiff, $lt: lng + lngdiff }
                            }).toArray(function (err, result) {
                                if (err) {
                                    callback("dbOpenError", "none");
                                    throw err;
                                }
                                if (result.length > 0) {
                                    total.push(result);
                                    //console.log(total);
                        //            console.log(total2);
                                    callback(total.length, total);
                                } else {
                                    console.log('no entry in db');
                                    //callback("error", "none");
                                }
                            });
                        });
                    });
                });
            
            });
        });
    });

    


    


    

    


    


    
}

function bestCategory(array, callback) {
    var best = []
    var i, j;
    for(i = 0; i<7; i++) {
        for(j=0;j<1;j++) {
            
            best.push(array[i][j]);
        }
    }
    //console.log(best);
    callback(best.length, best);
}

function findMuseumByName(queryName, callback) {
    console.log(queryName);
    museumCollection.find({ name: queryName }).toArray(function (err, result) {
        if (err) {
            callback("dbOpenError", "none");
            throw err;
        }
        if (result.length > 0) {
            callback(result.length, result);
        } else {
            console.log('no entry in db');
            callback("error", "none");
        }
    })
}

function findCampingByName(queryName, callback) {
    console.log(queryName);
    campingCollection.find({ name: queryName }).toArray(function (err, result) {
        if (err) {
            callback("dbOpenError", "none");
            throw err;
        }
        if (result.length > 0) {
            callback(result.length, result);
        } else {
            console.log('no entry in db');
            callback("error", "none");
        }
    })
}

function findFishingByName(queryName, callback) {
    console.log(queryName);
    fishingCollection.find({ name: queryName }).toArray(function (err, result) {
        if (err) {
            callback("dbOpenError", "none");
            throw err;
        }
        if (result.length > 0) {
            callback(result.length, result);
        } else {
            console.log('no entry in db');
            callback("error", "none");
        }
    })
}

function findForestByName(queryName, callback) {
    console.log(queryName);
    forestCollection.find({ name: queryName }).toArray(function (err, result) {
        if (err) {
            callback("dbOpenError", "none");
            throw err;
        }
        if (result.length > 0) {
            callback(result.length, result);
        } else {
            console.log('no entry in db');
            callback("error", "none");
        }
    })
}

function findParkingByName(queryName, callback) {
    console.log(queryName);
    parkingCollection.find({ name: queryName }).toArray(function (err, result) {
        if (err) {
            callback("dbOpenError", "none");
            throw err;
        }
        if (result.length > 0) {
            callback(result.length, result);
        } else {
            console.log('no entry in db');
            callback("error", "none");
        }
    })
}

function findRoadByName(queryName, callback) {
    console.log(queryName);
    roadCollection.find({ name: queryName }).toArray(function (err, result) {
        if (err) {
            callback("dbOpenError", "none");
            throw err;
        }
        if (result.length > 0) {
            callback(result.length, result);
        } else {
            console.log('no entry in db');
            callback("error", "none");
        }
    })
}

function findRuinsByName(queryName, callback) {
    console.log(queryName);
    ruinsCollection.find({ name: queryName }).toArray(function (err, result) {
        if (err) {
            callback("dbOpenError", "none");
            throw err;
        }
        if (result.length > 0) {
            callback(result.length, result);
        } else {
            console.log('no entry in db');
            callback("error", "none");
        }
    })
}

function findSiteByName(queryName, callback) {
    console.log(queryName);
    siteCollection.find({ name: queryName }).toArray(function (err, result) {
        if (err) {
            callback("dbOpenError", "none");
            throw err;
        }
        if (result.length > 0) {
            callback(result.length, result);
        } else {
            console.log('no entry in db');
            callback("error", "none");
        }
    })
}

function findValleyByName(queryName, callback) {
    console.log(queryName);
    valleyCollection.find({ name: queryName }).toArray(function (err, result) {
        if (err) {
            callback("dbOpenError", "none");
            throw err;
        }
        if (result.length > 0) {
            callback(result.length, result);
        } else {
            console.log('no entry in db');
            callback("error", "none");
        }
    })

}

module.exports.connectdb = connectdb;
module.exports.findCategoryByRange = findCategoryByRange;
module.exports.findCampingByName = findCampingByName;
module.exports.findFishingByName = findFishingByName;
module.exports.findForestByName = findForestByName;
module.exports.findMuseumByName = findMuseumByName;
module.exports.findParkingByName = findParkingByName;
module.exports.findRoadByName = findRoadByName;
module.exports.findRuinsByName = findRuinsByName;
module.exports.findSiteByName = findSiteByName;
module.exports.findValleyByName = findValleyByName;
module.exports.bestCategory = bestCategory;

