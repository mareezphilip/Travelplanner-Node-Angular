const hotelmodel = require("../../database/models/hotels.model")
const fs = require("fs")
const {
    resGenerator,
    fileHandler
} = require("../helper")

class hotel {
    static addhotel = async (req, res) => {
        try {
        
            // if (!req.files) {
            //     throw new Error(" add image ")
            //     // res.send("ana fe if ")
            // }
            let imagesNames=[]
            if (req.files){
                console.log(req.files.length)
                req.files.forEach(element => {
              const ext = element.originalname.split('.').pop() // jpeg
               
                const fileName = element.path + "." + ext
    
                fs.renameSync(element.path, fileName)
                const  newName= fileName.replace("public", "")
                imagesNames.push(newName)
                
                });
            }
        
          
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

    static deletehotel=async(req,res)=>{
        try{
            await hotelmodel.findByIdAndDelete(req.params.id)
            resGenerator(res, 200, true, null, "hotel deleted")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in delete")
        }  
    }
    static gethotelsNames = async(req,res) =>{
        try {
            const hotels = await hotelmodel.find()
            let arrhotels=[]
            hotels.forEach(element => {
              arrhotels.push(element.Name)
            });
            resGenerator(res, 200, true, arrhotels, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }

    static edithotel = async (req, res) => {
        try {
            if (req.files) {
                if (req.files.length > 0) {
                    let imagesNames = []
                    console.log(req.files.length)
                    req.files.forEach(element => {
                        const ext = element.originalname.split('.').pop() // jpeg

                        const fileName = element.path + "." + ext

                        fs.renameSync(element.path, fileName)
                        const newName = fileName.replace("public", "")
                        imagesNames.push(newName)

                    });
                    await hotelmodel.findByIdAndUpdate(req.params.id, {
                        ...req.body,
                        images: imagesNames
                    })
                }


                await hotelmodel.findByIdAndUpdate(req.params.id, req.body)

            } else {
                await hotelmodel.findByIdAndUpdate(req.params.id, req.body)
            }
            resGenerator(res, 200, true, null, "hotel updated")
        } catch (e) {
            resGenerator(res, 500, false, e.message, "error in update hotel")
        }
    }

}

module.exports = hotel