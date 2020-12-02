const dbutil = require("../dbutils/findbutil");

let lat = 37.50;
let lng = 126.95;

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
    dbutil.findCategoryByRange({lat,latdiff,lng,lngdiff},function(length, length1, result, result2){
        console.log("findCategory");
        callback(length, length1, result,result2);
    })
}

function getNearestPlacesFiltered(lat, lng, userPref, callback){
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
    dbutil.findCategoryByRange({lat,latdiff,lng,lngdiff},function(length,result){
        console.log("findCategory");
    })
}

dbutil.connectdb(function(){
    var array;
    getNearestPlaces(lat,lng, 1, function(length, length2, result, result2){
        array = result;
        //console.log(result2[1]);
        //console.log(result2);
        //console.log(array[3])
        //dbutil.bestCategory(array, function(length, result){
                
        //});
    
    });

})

