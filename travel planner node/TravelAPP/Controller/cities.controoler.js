const cityModel = require("../../database/models/cities.model")

const { resGenerator, fileHandler } = require("../helper")
class city {
    static addcity = async (req, res) => {
        try {
           console.log("ana fe el try")
            const cityData = new cityModel (req.body)
            await cityData.save()
            resGenerator(res, 200, true, cityData, "data added")
        }
        catch (e) {
            console.log("ana fel catch")
            resGenerator(res, 500, false, e.message, "error in insert")
        }
    }

    static getcitesName = async(req,res) =>{
        try {
            const cities = await cityModel.find()
            let arrCites=[]
            cities.forEach(element => {
              arrCites.push(element.Name)
            });
            resGenerator(res, 200, true, arrCites, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }
    static getcitesdata = async(req,res) =>{
        try {
            const cities = await cityModel.find()
           
            resGenerator(res, 200, true, cities, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }

    static addtrip = async (req, res) => {
        try {
           console.log("ana fe el try")
            const tripData = new cityModel (req.body)
            await tripData.save()
            resGenerator(res, 200, true, tripData, "data added")
        }
        catch (e) {
            console.log("ana fel catch")
            resGenerator(res, 500, false, e.message, "error in insert")
        }
    }
    static deletecity=async(req,res)=>{
        try{
            await cityModel.findByIdAndDelete(req.params.id)
            resGenerator(res, 200, true, null, "city deleted")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in delete")
        }  
    }

}

module.exports = city
