const travelController = require("../TravelAPP/Controller/travel.controller")
const {authUser, authAdmin} = require("../TravelAPP/MiddleWare/auth.middleware")
const upload = require("../TravelAPP/MiddleWare/upload.middleware")
const router = require("express").Router()





router.post("/addtravel",authUser,authAdmin , travelController.addtravel)
router.post("/addtrip/:id",authUser,authAdmin , travelController.addtrip)
router.get("/alltripsIntravel/:id", travelController.getalltrips)
router.get("/getalltravels", travelController.getalltravels)
router.delete("/deleteTravel/:id", travelController.deleteTravel)
router.delete("/deleteTripfromtravel/:id/:tripid",authUser,authAdmin , travelController.deleteTripfromTravel)














module.exports = router