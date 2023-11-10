const favController = require("../TravelAPP/Controller/fav.controller")
const {authUser, authAdmin} = require("../TravelAPP/MiddleWare/auth.middleware")
const upload = require("../TravelAPP/MiddleWare/upload.middleware")
const router = require("express").Router()





router.post("/handelfav",authUser, favController.handlefav)
router.get("/getallFav",authUser, favController.showAllfav)






module.exports = router