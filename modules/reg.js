 const mongoose=require('mongoose')


const regSchema=  mongoose.Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String,
    mobile:Number,
    dob:Date,
    gender:String,
    channel:{type:String,default:'unsubscribe'},
    img:{type:String,default:'default.png'},
    status:{type:'string',default:'suspended'},
    creationDate:{type:Date,default:new Date()},
    desc:String
 })





  module.exports= mongoose.model('reg',regSchema)