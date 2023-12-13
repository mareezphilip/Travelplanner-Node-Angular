const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
        minLength:2,
        maxLength:20,
        trim:true
    },
   
    email:{
        type:String,
        trim:true,
        required:true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("invalid email format")
    }
    },
    countryCode:{
        type:String,
      
    },
    phone:{
        type:String,
        trim:true,
        
        validate(value){
            
            if(!validator.isMobilePhone(value, this.countryCode)) 
                throw new Error("invalid number")
        }
    },
    password:{
        type:String,
        
        trim:true,
        // match: /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/
        // match: /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@#%])[A-Za-z\d@#%]{8,}$/
    },
    gender:{
        type:String,
        trim:true,
        enum:["male", "female"]
    },
    dOfBirth:{
        type:Date,
        max:"2020-01-01",
        min:"1940-1-1"
    },

    addresses: 
        {
            country:{
                type:String,
               
                trim:true
            },
            city:{
                type:String,
                
                trim:true
            }
        }
    ,
    userType:{
        type:String,
        enum : ["admin", "user"],
        default: "user"
    },
    tokens:[
        {
            token:{
                type:String,
                
                required:true
            }
        }
    ]
},

{
    timestamps : true  
}
)
userSchema.virtual("booked", {
    ref:"booked",
    localField: "_id",
    foreignField:"userId"
})
userSchema.virtual("review", {
    ref:"review",
    localField: "_id",
    foreignField:"userId"
})
userSchema.virtual("fav", {
    ref:"fav",
    localField: "_id",
    foreignField:"userId"
})




//make data unvisible
userSchema.methods.toJSON = function(){
    const data = this.toObject()
    delete data.password
    delete data.tokens
    delete data.__v
    return data
}


userSchema.pre("save", async function(){
    if(this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 10)
})

userSchema.statics.logMe = async(email, password)=>{
    const userData = await userModel.findOne( { email } )
    if(!userData) throw new Error("invalid email")
    const isPasswordMatched = await bcrypt.compare(password, userData.password)
    if(!isPasswordMatched) throw new Error("invalid password")
    return userData
}


userSchema.methods.generateToken = async function(){
    const token = jwt.sign({_id: this._id}, process.env.jwtKey)
    this.tokens.push( { token })
    await this.save()
    return token
}

const userModel = new mongoose.model("user", userSchema)
module.exports = userModel