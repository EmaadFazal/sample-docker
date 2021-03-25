const mongoose = require("mongoose");
var Schema = mongoose.Schema

var PlayerSchema = new Schema({
    Name:String,
    Team:String,
    G:Number,
    PA:Number,
    AB:Number,
    H:Number,
    '2B':Number,
    '3B':Number,
    HR:Number,
    Rbs:Number,
    RBI:Number,
    BB:Number,
    SO:Number,
    HBP:Number,
    SB:Number,
    CS:Number,
    ///advanced stats below
    AVG:Number,
    OBP:Number,
    SLG:Number,
    OPS:Number,
    wOBA:Number,
    'wRC+':Number
    
})

module.exports= Rbs = mongoose.model("players",PlayerSchema,'players')// model name is users and it uses the UserSchema