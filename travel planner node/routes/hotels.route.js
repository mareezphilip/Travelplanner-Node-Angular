const hotelController = require("../TravelAPP/Controller/hotels.controller")
const {authUser, authAdmin} = require("../TravelAPP/MiddleWare/auth.middleware")
const upload = require("../TravelAPP/MiddleWare/upload.middleware")
const router = require("express").Router()





router.post("/addhotel",authUser,authAdmin,upload.array('images', 5) , hotelController.addhotel)
router.get("/allhotels", hotelController.getAllHotels)

router.delete("/deletehotel/:id" ,authUser ,authAdmin  ,hotelController.deletehotel)

router.get("/hotelsName",hotelController.gethotelsNames)
router.patch("/edithotel/:id",authUser,authAdmin,upload.array('images', 5) , hotelController.edithotel)


module.exports = router