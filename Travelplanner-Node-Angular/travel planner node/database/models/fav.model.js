const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const favschema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user", 
        required:true
    },
    travels:[
        {
            travelid: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"travel", 
                required:true
            },
           
          
        }
    ]
    

})


const favModel = new mongoose.model("fav", favschema)
module.exports = favModel