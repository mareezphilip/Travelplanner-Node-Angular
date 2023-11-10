const tripModel = require("../../database/models/trip.model")
const fs = require("fs")
const {
    resGenerator,
    fileHandler
} = require("../helper")
class trip {
    static addtrip = async (req, res) => {
        try {
            console.log("ana fe add trip")
            if (!req.files) {
                throw new Error(" add image ")
            }
            let imagesNames = []
            console.log(req.files.length)
            req.files.forEach(element => {
                const ext = element.originalname.split('.').pop() // jpeg

                const fileName = element.path + "." + ext

                fs.renameSync(element.path, fileName)
                const newName = fileName.replace("public", "")
                imagesNames.push(newName)

            });

            const tripobj = new tripModel({
                ...req.body,
                images: imagesNames
            })
            await tripobj.save()
            resGenerator(res, 200, true, tripobj, "data added")

        } catch (e) {
            resGenerator(res, 500, false, e.message, "error in insert")
        }
    }

    static editTrip = async (req, res) => {
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
                    await tripModel.findByIdAndUpdate(req.params.id, {
                        ...req.body,
                        images: imagesNames
                    })
                }


                await tripModel.findByIdAndUpdate(req.params.id, req.body)

            } else {
                await tripModel.findByIdAndUpdate(req.params.id, req.body)
            }
            resGenerator(res, 200, true, null, "trip updated")
        } catch (e) {
            resGenerator(res, 500, false, e.message, "error in update trip")
        }
    }
    static getalltrip = async (req, res) => {
        try {
            const trips = await tripModel.find({
                cityname: req.params.cityname
            }) // null
            if (trips) {
                resGenerator(res, 200, true, trips, "all trips showed")
            } else {
                resGenerator(res, 404, true, null, "no trips")

            }
        } catch (e) {
            resGenerator(res, 500, false, e.message, "error in get alltrips")

        }
    }
    static deletetrip = async (req, res) => {
        try {
            await tripModel.findByIdAndDelete(req.params.id)
            resGenerator(res, 200, true, null, " trip deleted")

        } catch (e) {
            resGenerator(res, 500, false, e.message, "error trip deleted")

        }
    }
}

module.exports = trip