const hotelmodel = require("../../database/models/hotels.model")
const fs = require("fs")
const {
    resGenerator,
    fileHandler
} = require("../helper")
class hotel {
    static addhotel = async (req, res) => {
        try {
        
            if (!req.files) {
                throw new Error(" add image ")
            }
            let imagesNames=[]
            console.log(req.files.length)
            req.files.forEach(element => {
          const ext = element.originalname.split('.').pop() // jpeg
           
            const fileName = element.path + "." + ext

            fs.renameSync(element.path, fileName)
            const  newName= fileName.replace("public", "")
            imagesNames.push(newName)
            
            });
          
            const hotelobj = new hotelmodel({...req.body,images:imagesNames})
            await hotelobj.save()
            resGenerator(res, 200, true, hotelobj, "data added")

        } catch (e) {
            resGenerator(res, 500, false, e.message, "error in insert")
        }
    }
    static getAllHotels=async(req,res)=>{
        try {
            const hotels = await hotelmodel.find()
           
            resGenerator(res, 200, true, hotels, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }
}

module.exports = hotel