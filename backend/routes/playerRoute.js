var express = require('express');
var router = express.Router();
var {getPlayers} = require('../services/playerService')


router.get('/',async (req,res)=>{
    res.send(await getPlayers())
})


module.exports= router