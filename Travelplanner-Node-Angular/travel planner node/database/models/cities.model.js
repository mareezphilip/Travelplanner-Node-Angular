const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const citySchema = mongoose.Schema({

    Name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20,
        trim: true
    },
    loccationCity: {
        type: String,
        trim: true
    },
    trip: [{
        description: {
            type: String,
            trim: true
        },
        price:{
            type:Number,  
        },
        images: [{
            type: String,
            trim: true
        }],
    }]


})


const cityModel = new mongoose.model("city", citySchema)
module.exports = cityModel