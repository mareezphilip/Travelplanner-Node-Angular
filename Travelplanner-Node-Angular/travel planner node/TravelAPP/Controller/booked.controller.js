const bookedmodel = require("../../database/models/booked.model")
const fs = require("fs")
const {
    resGenerator,
    fileHandler
} = require("../helper")
class booked {
    static addtobooked = async (req, res) => {
        try {
            let alreadyBooked = await bookedmodel.findOne({
                userId: req.user._id
            })
            if (!alreadyBooked) {
                console.log("anaa fel !not old booked")
                const booked = new bookedmodel({
                    userId: req.user._id,
                    ...req.body
                })
                await booked.save()
                resGenerator(res, 200, true, booked, "added to booked")
            } else {
                let travelfound = alreadyBooked.travels.findIndex(t => t.travelid == req.body.travels[0].travelid)
                if (travelfound == -1) {
                    alreadyBooked.travels.push((req.body.travels[0]))
                    await alreadyBooked.save()
                    resGenerator(res, 200, true, alreadyBooked, "added to booked")
                } else {
                    resGenerator(res, 200, true, alreadyBooked, "already booked")
                }
            }

        } catch (e) {
            console.log("ana fe catch")
            resGenerator(res, 500, false, e.message, "error in insert")
        }
    }
    static showAllbooked = async (req, res) => {
        try {
            const booked = await bookedmodel.find()
            resGenerator(res, 200, true, booked, "data showed")
        } catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }
    static userbooked = async (req, res) => {
        try {
            const userbooked = await bookedmodel.find({
                userId: req.user._id
            }) // null
            if (!userbooked[0])
                resGenerator(res, 200, true, userbooked[0], "empty cart")
            resGenerator(res, 200, true, userbooked[0], "data showed")
        } catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }
    static incnumbersOfperson = async (req, res) => {
        try {
            const booked = await bookedmodel.find({
                userId: req.user._id
            })
            
            const bookedindex = booked[0].travels.findIndex(t => t.travelid == req.params.tId)
          

            if (bookedindex) {
                booked[0].travels[bookedindex].numberOfPerson += 1
                await booked[0].save()
                resGenerator(res, 200, true, booked[0], "#persons updated")
            }
        } catch (e) {
            resGenerator(res, 500, false, e.message, "error in edit")
        }
    }

    static decnumbersOfperson = async (req, res) => {
        try {
            const booked = await bookedmodel.find({
                userId: req.user._id
            })
            const bookedindex = booked[0].travels.findIndex(t => t.travelid == req.params.tId)
            if (bookedindex) {
                booked[0].travels[bookedindex].numberOfPerson -= 1
                await booked[0].save()
                resGenerator(res, 200, true, booked[0], "#persons updated")
            }
        } catch (e) {
            resGenerator(res, 500, false, e.message, "error in edit")
        }
    }
    
  static cancelbookedtravel = async(req,res)=>{
    try{
      const booked = await bookedmodel.find({userId:req.user._id})
     const bookedindex = booked[0].travels.findIndex(t=> t.travelid == req.params.tId )
   console.log(bookedindex)
     if(bookedindex != -1) {
        booked[0].travels.splice(bookedindex,1)
        await booked[0].save()
        resGenerator(res, 200, true, booked[0], "travel deleted")
     }
    }
     catch(e){
      resGenerator(res, 500, false, e.message, "error in delete travel")
     }
  }


}

module.exports = booked