const tripController = require("../TravelAPP/Controller/trip.controller")
const {authUser, authAdmin} = require("../TravelAPP/MiddleWare/auth.middleware")
const upload = require("../TravelAPP/MiddleWare/upload.middleware")
const router = require("express").Router()





router.post("/addtrip",authUser,authAdmin,upload.array('images', 5) , tripController.addtrip)
router.patch("/edittrip/:id",authUser,authAdmin,upload.array('images', 5) , tripController.editTrip)
router.get("/gettrips/:cityname", tripController.getalltrip)
router.delete("/deletetrip/:id",authUser,authAdmin, tripController.deletetrip)






module.exports = router