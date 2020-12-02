const dbutil = require("../dbutils/findbutil");

let lat = 37.50;
let lng = 126.95;

function getNearestPlaces(lat, lng, userPref, callback){
    // lat, lng, userpref(1~3), 30km, 60km, 90km
    let latdiff = userPref/10; 
    let lngdiff = userPref/10;
    // access db
    dbutil.findCategoryByRange({lat,latdiff,lng,lngdiff},function(length, result){
        console.log("findCategory");
        callback(length, result);
    })
}

function getNearestPlacesFiltered(lat, lng, userPref, callback){
    dbutil.connectdb(function(){
        getNearestPlaces(lat,lng, userPref, function(length, result){
            dbutil.bestCategory(result, function(length, result){
                    callback(length, result);
            });         
        });
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

function makeFilteredCourse(lat, lng, time, category, callback) {
    var course = [];
    var i = getRandomInt(0, 7);
    var j = getRandomInt(0, 3);
    var k, l;
    dbutil.connectdb(function(){
        getNearestPlaces(lat,lng, time/3, function(length, result){
            
            for(k=0; k<7; k++) {
                if(result[k][0].category == category) {
                    course.push(result[k][j]);
                    lat=result[k][j].latitude;
                    lng=result[k][j].longitude;
                    i = getRandomInt(0, 7);
                    j = getRandomInt(0, 3);
                    course.push(result[i][j]);
                    i = getRandomInt(0, 7);
                    j = getRandomInt(0, 3);
                    course.push(result[i][j]);
                    break;
                    
                }
            }
            console.log(course);
            
            
        });
    })
    
    

}

makeFilteredCourse(lat, lng, 3, "야영장", function(length, result){
    
});

// getNearestPlacesFiltered(lat, lng, 3, function(length, result){
//     console.log(result[0].category);
//     if(result[0].category == "야영장"){
//         console.log("1");
//     }
//     else{
//         console.log("0");
//     }
// });
module.exports.getNearestPlacesFiltered = getNearestPlacesFiltered;



