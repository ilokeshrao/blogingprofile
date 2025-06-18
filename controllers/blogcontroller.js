 const Blog =require('../modules/blog')


 exports.blogselection=async(req,res)=>{
    const username=  req.session.username
    const record=  await Blog.find({email:username})
    res.render('blog.ejs',{username,record})
 }
 exports.blogform=(req,res)=>{
   const username=  req.session.username
   res.render('blogform.ejs',{username})
 }
 exports.addblog=(req,res)=>{
   const username= req.session.username
  const {title,blog}=req.body  
  const record=  new Blog({email:username,title:title,blog:blog,})
  record.save()
res.redirect('/yourblog')
 }
 exports.deleteblog=async(req,res)=>{
   const id= req.params.id
   const record=  await Blog.findByIdAndDelete(id)
   res.redirect('/yourblog')
 }
 exports.allblog=async(req,res)=>{
   const username= req.session.username
   const record=  await Blog.find().sort({createDate:-1})
   res.render('allblogs.ejs',{username,record})
 }