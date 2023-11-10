const cityController = require("../TravelAPP/Controller/cities.controoler")
const {authUser, authAdmin} = require("../TravelAPP/MiddleWare/auth.middleware")
// const upload = require("../coffeeApp/middleware/upload.middleware")
const router = require("express").Router()





router.post("/addcity",authUser,authAdmin, cityController.addcity)


router.get("/citiesName",cityController.getcitesName)
router.get("/allcitesdata",cityController.getcitesdata)




module.exports = router