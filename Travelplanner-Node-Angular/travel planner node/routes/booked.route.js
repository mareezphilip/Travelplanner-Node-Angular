const bookedController = require("../TravelAPP/Controller/booked.controller")
const {authUser, authAdmin} = require("../TravelAPP/MiddleWare/auth.middleware")
const upload = require("../TravelAPP/MiddleWare/upload.middleware")
const router = require("express").Router()





router.post("/addtobooked",authUser, bookedController.addtobooked)
router.get("/allbooked",authUser, bookedController.showAllbooked)
router.get("/userbooked",authUser, bookedController.userbooked)
router.patch("/incnumbersOfperson/:tId",authUser, bookedController.incnumbersOfperson)
router.patch("/decnumbersOfperson/:tId",authUser, bookedController.decnumbersOfperson)
router.delete("/cancelbookedtravel/:tId",authUser, bookedController.cancelbookedtravel)










module.exports = router