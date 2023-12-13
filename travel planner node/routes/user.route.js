const userController = require("../TravelAPP/Controller/user.controller")
const {authUser, authAdmin} = require("../TravelAPP/MiddleWare/auth.middleware")
// const upload = require("../coffeeApp/middleware/upload.middleware")
const router = require("express").Router()





router.post("/add", userController.adduser)

router.post("/login" , userController.login)
router.get("/logout" , authUser , userController.logOut)
router.get("/myprofile" , authUser , userController.myProfile )
router.patch("/editprofile"  , authUser , userController.editProfile)
router.post("/addadmin" , authUser , authAdmin , userController.addAdmin)
router.get("/getallemails"  , userController.getallemails)



module.exports = router

