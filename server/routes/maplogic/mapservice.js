var Location = require("../../model/location");


var locations = [];

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





module.exports.initTest = initTest;
module.exports.printLocations = printLocations;
module.exports.getLocations = getLocations;