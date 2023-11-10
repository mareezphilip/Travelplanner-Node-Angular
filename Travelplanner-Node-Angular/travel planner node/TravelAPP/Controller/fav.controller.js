const favmodel = require("../../database/models/fav.model")
const fs = require("fs")
const {
    resGenerator,
    fileHandler
} = require("../helper")
class fav {
    static handlefav = async (req, res) => {
        try {

            const favTravels = await favmodel.findOne({
                userId: req.user._id
            })
            if (!favTravels) {
                console.log("anaa fel !not old booked")
                const fav = new favmodel({
                    userId: req.user._id,
                    ...req.body
                })
                await fav.save()
                resGenerator(res, 200, true, fav, "added to fav")
            } else {
            
                let favfound = favTravels.travels.findIndex(t => t.travelid == req.body.travels[0].travelid)
               console.log(favfound)
                if (favfound == -1) {
                    console.log("ana fe if ")
                    favTravels.travels.push((req.body.travels[0]))
                    await favTravels.save()
                    resGenerator(res, 200, true, favTravels, "added to fav")
                } else {
                    console.log("ana fe else ")
                    console.log(favTravels)
                    favTravels.travels.splice(favfound, 1)
                    await favTravels.save()
                    resGenerator(res, 200, true, favTravels, "fav deleted")
                }
            }

        } catch (e) {
            console.log("ana fe catch")
            resGenerator(res, 500, false, e.message, "error in insert")
        }
    }
    static showAllfav = async (req, res) => {
        try {
            const fav = await favmodel.find({userId: req.user._id})
            resGenerator(res, 200, true, fav, "data showed")
        } catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }




}

module.exports = fav