const dbutil = require("../dbutils/findbutil");



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
    var course1 = [], course2 = [], course3 = [];
    var random = [], random1 = [], random2 = [];
    var i, j;
    var x = getRandomInt(0, 7);
    var y = getRandomInt(0, 3);
    
    var k, l;
    dbutil.connectdb(function(){
        getNearestPlaces(lat,lng, time, function(length, result){
            
            for(k=0; k<7; k++) {
                if(result[k][0].category == category) {
                    x=k;
                    y=getRandomInt(0,3);
                    random.push([x,0]);
                    random1.push([x,1]);
                    random2.push([x,2]);
                    for(i=0;i<2;i++) {
                        var check=1;
                        
                        while(check == 1) {
                            check = 0;
                            x = getRandomInt(0, 7);
                            y = getRandomInt(0, 3);
                            for(j=0; j<=i; j++) {
                                if(random[j] == [x,y]) {
                                    check = 1;
                                }
                            }
                        }
                        random.push([x,y]);
                    }
                    for(i=0;i<2;i++) {
                        var check=1;
                        
                        while(check == 1) {
                            check = 0;
                            x = getRandomInt(0, 7);
                            y = getRandomInt(0, 3);
                            for(j=0; j<=i; j++) {
                                if(random1[j] == [x,y]) {
                                    check = 1;
                                }
                            }
                        }
                        random1.push([x,y]);
                    }
                    for(i=0;i<2;i++) {
                        var check=1;
                        
                        while(check == 1) {
                            check = 0;
                            x = getRandomInt(0, 7);
                            y = getRandomInt(0, 3);
                            for(j=0; j<=i; j++) {
                                if(random2[j] == [x,y]) {
                                    check = 1;
                                }
                            }
                        }
                        random2.push([x,y]);   
                    }
                    break;
                    
                }
            }
            
            for(i=0; i<3; i++) {
                course1.push(result[random[i][0]][random[i][1]]);
                course2.push(result[random1[i][0]][random1[i][1]]);
                course3.push(result[random2[i][0]][random2[i][1]]);
            }
            callback(course1, course2, course3);
            // console.log(course1);
            // console.log(course2);
            // console.log(course3);
            
            
        });
    })
    
    

}

// makeFilteredCourse(lat, lng, 3, "야영장", function(length, result){
    
// });

// getNearestPlacesFiltered(lat, lng, 3, function(length, result){
//     console.log(result);
    
// });
module.exports.getNearestPlacesFiltered = getNearestPlacesFiltered;
module.exports.makeFilteredCourse = makeFilteredCourse;


