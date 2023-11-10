const reviewController = require("../TravelAPP/Controller/review.controller")
const {authUser, authAdmin} = require("../TravelAPP/MiddleWare/auth.middleware")
const upload = require("../TravelAPP/MiddleWare/upload.middleware")
const router = require("express").Router()





router.post("/addreview/:tId",authUser, reviewController.addReview)
router.get("/allreview/:tId", reviewController.showTravelReviews)
router.get("/allrate/:tId", reviewController.showTravelsRate)
router.patch("/editReview/:tId",authUser, reviewController.editMyReview)








module.exports = router