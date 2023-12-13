const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const tripSchema = mongoose.Schema({

    cityname: {
        type: String,
        trim: true,
        required: true

    },

    description: {
        type: String,
        trim: true,
        required: true
    },
    images: [{
        type: String,
        trim: true
    }],
    price: {
        type: Number,
        required: true
    }



})
tripSchema.virtual("mytrip", {
    ref:"travel",
    localField: "_id",
    foreignField:"program.tripid"
})

const tripModel = new mongoose.model("trip", tripSchema)
module.exports = tripModel