 const mongoose =require('mongoose')


  const blogSchema= mongoose.Schema({
    email:String,
    title:String,
    blog:String,
    createDate:{type:Date,default:Date.now()}
 })





  module.exports= mongoose.model('blog',blogSchema)