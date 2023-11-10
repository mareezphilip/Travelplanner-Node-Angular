const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const hotelSchema = mongoose.Schema({

    Name:{
        type:String,
        required:true,
        minLength:2,
        maxLength:20,
        trim:true
    },
   
    cityname:{
    type:String,
    trim:true,
    required:true

    },
    pricePerDay:{
        type:Number,
        required:true
    },
    images:[{
        type:String,
        trim:true
    }],
    locationhotel:{
        type:String,
        trim:true
    }


})

hotelSchema.virtual("myhotel", {
    ref:"travel",
    localField: "_id",
    foreignField:"hotelid"
})

const hotelModel = new mongoose.model("hotel", hotelSchema)
module.exports = hotelModel