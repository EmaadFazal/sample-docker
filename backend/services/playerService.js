const hitters = require('../models/BaseballSchema')



async function getPlayers(){
    return await hitters.aggregate([
        {$addFields:{
            points:{$add:[{$multiply:["$HR",10]},{$multiply:["$2B",5]},{$multiply:["$3B",7.5]},{$multiply:["$RBI",2]},{$multiply:["$R",2]},{$multiply:["$BB",1]}],}
        }},
        {$project:{
            Name:1,
            points:"$points",
            position:"$position"
        }},
        {$limit:100},
        {$group:{
            _id:null,
            total:{$sum:"$points"},
            avg:{$avg:"$points"},
            std:{$stdDevPop:"$points"},
            players:{$push:"$$ROOT"}
        }},
        {$unwind:"$players"},
        {$sort:{"players.points":-1}},
        {$addFields:{
            "z-score":{$divide:[{$subtract:["$players.points","$avg"]},"$std"]}
        }},
       
        {$project:{
        avg:1,
        std:1,
        _id:"$players._id",
        name:"$players.Name",
        points:"$players.points",
        position:"$players.position",
        "zScore":"$z-score"
        }},
        {$limit:150}
    ])

}


module.exports={
    getPlayers
}