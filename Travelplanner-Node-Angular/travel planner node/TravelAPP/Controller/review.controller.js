const reviewModel = require("../../database/models/review.model")
const fs = require("fs")
const { resGenerator, fileHandler } = require("../helper")
class review {
    static addReview= async(req,res)=>{
        try {
            const reviewData = new reviewModel({...req.body, userId:req.user._id,travelid:req.params.tId})
            await reviewData.save()
            resGenerator(res, 200, true, reviewData, "review added")
        }
        catch (e) {
            resGenerator(res, 500, false, e, "error in insert")
        }
    }
    static showTravelReviews=async(req,res)=>{
        try {
        const allReviews=await reviewModel.find({travelid:req.params.tId})
        resGenerator(res, 200, true, allReviews, "all reviews")
            
        } 
        
        catch (e) {
            resGenerator(res, 500, false, e, "error in show")

            
        }
    }
    static showTravelsRate=async(req,res)=>{
        try {
        const travelReviews=await reviewModel.find({travelid:req.params.tId})
        let allRates=[]
        travelReviews.forEach(element => {
          allRates.push(element.rate)
        });
        resGenerator(res, 200, true, allRates, "all reviews")
            
        } 
        
        catch (e) {
            resGenerator(res, 500, false, e, "error in show")

            
        }
    }
    static editMyReview =async(req,res)=>{
        try {
            const allowedEdits = ["reviewDescription","rate"]
            const icomingReqHeaders = Object.keys(req.body)
            //every
            const result = icomingReqHeaders.every((head) => {
                return allowedEdits.includes(head)
            })
            if (!result)
                resGenerator(res, 404, false, null, "invalid updates")
          

             const reviewData = await reviewModel.find({userId :req.user._id,travelid:req.params.tId})
             icomingReqHeaders.forEach(el=> reviewData[0][el]= req.body[el])
             await reviewData[0].save()
            if (!reviewData[0])
                resGenerator(res, 404, false, reviewData[0], "User not found")
            resGenerator(res, 200, true, reviewData[0], "review edited")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in edit review")
        }
    
    }



}
module.exports = review