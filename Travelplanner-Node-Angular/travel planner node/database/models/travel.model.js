const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const travelSchema = mongoose.Schema({

    cityname: {
        type: String,
        trim: true,
        required: true

    },

    hotelid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hotels",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    program: [{
        tripid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "trip",
            required: true
        },
        day: {
            type: Number,
            required: true
        }
    }],
   

})
travelSchema.virtual("booked", {
    ref:"booked",
    localField: "_id",
    foreignField:"travels.travelid"
})
travelSchema.virtual("review", {
    ref:"review",
    localField: "_id",
    foreignField:"travelid"
})
travelSchema.virtual("fav", {
    ref:"fav",
    localField: "_id",
    foreignField:"travels.travelid"
})

const travelModel = new mongoose.model("travel", travelSchema)
module.exports = travelModel