const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const bookedSchema = mongoose.Schema({
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
            numberOfPerson:{
                type:Number,
                required:true
            }
          
        }
    ]
       
    
   })

const bookedModel = new mongoose.model("booked", bookedSchema)
module.exports = bookedModel