const travelModel = require("../../database/models/travel.model")
const fs = require("fs")
const {
    resGenerator,
    fileHandler
} = require("../helper")
class travel {
    static addtravel = async (req, res) => {
        try {
            console.log("ana fe el try")
            const traveldata = new travelModel(req.body)
            await traveldata.save()
            resGenerator(res, 200, true, traveldata, "data added")
        } catch (e) {
            console.log("ana fel catch")
            resGenerator(res, 500, false, e.message, "error in insert")
        }
    }
    static addtrip = async (req, res) => {
        try {
            console.log("anaaa fe trrrrrry")
            const traveldata = await travelModel.find({
                _id: req.params.id
            })
            console.log(traveldata[0].program.length)
            if (traveldata[0].program.length == 0) {
                // const trip=[]
                traveldata[0].program.push(req.body)
                await travelModel.findByIdAndUpdate(req.params.id, {
                    program: traveldata[0].program,
                })
                console.log(traveldata[0])
                resGenerator(res, 200, true, traveldata, "data added")

            } else {
                console.log("anaa fe else ya gama3a")
                let trip = []
                trip = traveldata[0].program
                console.log(trip)
                trip.push(req.body)
                const travelUpdate = await travelModel.findByIdAndUpdate(req.params.id, {
                    program: trip,
                })
                resGenerator(res, 200, true, travelUpdate, "data added")

            }



        } catch (e) {
            console.log("ana fel catch")
            resGenerator(res, 500, false, e.message, "error in insert")
        }
    }
    static getalltrips = async (req, res) => {
        try {
            const alltrips=await travelModel.find({_id:req.params.id})
            resGenerator(res, 200, true, alltrips[0].program, "show sucessfully")

        } catch (e) {
            console.log("ana fel catch")
            resGenerator(res, 500, false, e.message, "error in show")
        }
    }

    static getalltravels = async (req, res) => {
        try {
            const alltravels=await travelModel.find()
            resGenerator(res, 200, true, alltravels, "show sucessfully")

        } catch (e) {
            console.log("ana fel catch")
            resGenerator(res, 500, false, e.message, "error in show")
        }
    }
    static deleteTravel=async(req,res)=>{
        try{
            await travelModel.findByIdAndDelete(req.params.id)
            resGenerator(res, 200, true, null, "travel deleted")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in delete")
        }
    }
    static deleteTripfromTravel=async(req,res)=>{
        try{
            const travel = await travelModel.find({_id:req.params.id})
           const tripindex = travel[0].program.findIndex(t=> t.tripid == req.params.tripid )
           console.log(tripindex)

           if(tripindex) {
              travel[0].program.splice(tripindex,1)
              await travel[0].save()
              resGenerator(res, 200, true, travel[0], "travel deleted")
           }
          }
           catch(e){
            resGenerator(res, 500, false, e.message, "error in delete travel")
           }
    }

}

module.exports = travel