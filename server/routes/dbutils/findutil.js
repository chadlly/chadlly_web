var MongoClient = require("mongodb").MongoClient;


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