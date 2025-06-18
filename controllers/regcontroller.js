const Reg = require('../modules/reg')
const bcrypt = require('bcrypt')
const session = require('express-session')
const nodemailer = require('nodemailer')




exports.loginname = (req, res) => {
   res.render('login.ejs', { message: '' })
}
exports.registerpage = (req, res) => {
   res.render('reg.ejs', { message: '' })
}
exports.register = async (req, res) => {
   const { username, password } = req.body
   const convertedpass = await bcrypt.hash(password, 10)
   //   console.log(convertedpass)
   const usercheck = await Reg.findOne({ email: username })
   // console.log(usercheck)    
   if (usercheck == null) {
      const record = new Reg({ email: username, password: convertedpass })
      record.save()

      const transporter = nodemailer.createTransport({
         host: "smtp.gmail.com",
         port: 587,
         secure: false,
         auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: 'l6858729@gmail.com',
            pass: 'rrgk nsyg xdby xcee'
         },
      });
      console.log('connect to smpt server')
      // console.log(record.id)
      const info = await transporter.sendMail({
         from: 'lkyadav2311@gmail.com', // sender address
         to: username, // list of receivers
         subject: "Email Confirmation - Web Project 2", // Subject line
         text: "Please click on below to verify your email", // plain text body
         html: `<a href=http://localhost:5000/emailvarify/${record.id}>Verify</a>`, // html body
     });
      res.render('reg.ejs', { message: " Account has been register" })
   } else {
      res.render('reg.ejs', { message: `${username}email is already register` })
   }
   //console.log(record)
}
exports.emailsendlink = async (req, res) => {
   const id = (req.params.id)
   await Reg.findByIdAndUpdate(id, { status: 'active' })
   res.render('emailverifymessage.ejs')
}

exports.logincheck = async (req, res) => {
   const { us, pass } = req.body
   const record = await Reg.findOne({ email: us })
   if (record !== null) {
      const passwordcheck = await bcrypt.compare(pass, record.password)
      if (passwordcheck) {
         if (record.status == 'suspended') {
            res.render('login', { message: 'your email id is not verify please chek your email id' })
         } else {
            req.session.isAuth = true
            req.session.username = record.email
            req.session.userid = record.id
            if (record.email == 'admin@gmail.com') {
               res.redirect('/admin/dashboard')
            } else {
               res.redirect('/userprofiles')
            }
         }
      } else {
         res.render('login', { message: 'wrong password' })
      }
   } else {
      res.render('login.ejs', { message: 'wrong crdentails' })
   }
}

exports.forgetform = (req, res) => {
   res.render('forgetform.ejs', { message: '' })
}

exports.forgetsendlink = async (req, res) => {
   try{
   const { us } = req.body
   const record = await Reg.findOne({ email: us })
   console.log(record)
   if (record !== null) {
      const transporter = nodemailer.createTransport({
         host: "smtp.gmail.com",
         port: 587,
         secure: false,
         auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: 'l6858729@gmail.com',
            pass:'rrgk nsyg xdby xcee'

         },
      });
      console.log('connect to smpt server')
      const info = await transporter.sendMail({
         from: 'l6858729@gmail.com', // sender address
         to: us, // list of receivers
         subject: 'password change link', // Subject line
         text: 'please click on below link to change your password', // plain text body
         html: `<a href=http://localhost:5000/forgetpasswordlink/${record.id}>click to open google</a>`, // html body
      });
      res.render('forgetlinkmessage.ejs')
   } else {
      res.render('forgetform.ejs', { message: 'Email not registered to us' })
   }
}catch(error){
    console.log(error.messaage)
}
}
exports.forgetpasslink = (req, res) => {
   console.log(req.params.id)
   res.render('forgetpasswordform.ejs')
}
exports.forgetpasswordchange = async (req, res) => {
   const { pass } = req.body
   const id = req.params.id
   const cpass = await bcrypt.hash(pass, 10)
   await Reg.findByIdAndUpdate(id, { password: cpass})
   res.render('changepasswordmessage.ejs')
}

exports.logout = (req, res) => {
   req.session.destroy()
   res.redirect('/')
}

exports.adminuser = async (req, res) => {
   const username = req.session.username
   const record = await Reg.find()
   res.render('admin/user.ejs', { username, record })
}
exports.statusupdate = async (req, res) => {
   const id = req.params.id
   const record = await Reg.findById(id)
   let newstatus = null
   if (record.status == 'active') {
      newstatus = 'suspended'
   } else {
      newstatus = 'active'
   }
   await Reg.findByIdAndUpdate(id, { status: newstatus })
   res.redirect('/admin/user')


   console.log(record)
}

exports.userprofile = async(req, res) => {
   const username = req.session.username
   const record = await Reg.find({status:'active'})
   res.render('userprofile.ejs', { username, record })
}
exports.profileupdateform = async (req, res) => {
   const username = req.session.username
   const record = await Reg.findById(req.session.userid)
   res.render('profileupdateform.ejs', { username, record, message: '' })
}
exports.profileupdate = async (req, res) => {
   const id = req.session.userid
   const username = req.session.username
   const record = await Reg.findById(id)
   const { fname, lname, mobile, dob, gender,about } = req.body
   if(req.file){
      const filename =req.file.filename
      await Reg.findByIdAndUpdate(id, { firstName: fname, lastName: lname, mobile: mobile, dob: dob, gender: gender, img:filename, desc:about})
   }else{
      await Reg.findByIdAndUpdate(id, { firstName: fname, lastName: lname, mobile: mobile, dob: dob, gender: gender, desc:about}) 
   }
   res.render('profileupdateform.ejs', { message: 'profile has been update successfuly', username, record })

} 
exports.deleteemail=async(req,res)=>{
    const id= req.params.id
    await Reg.findByIdAndDelete(id)
    res.redirect('/admin/user')
}
exports.usercontact=async(req,res)=>{
   const id = req.params.id
   const username = req.session.username
   const record = await Reg.findById(id)
   if(record.channel=='subscribe'){
   res.render('usercontact.ejs', {username, record})
   console.log(record)
   }
   else{
      res.render('suberror.ejs')
   }
}

exports.substatus = async (req, res) => {
   const id = req.params.id
   const record = await Reg.findById(id)
   let newsub = null
   if (record.channel == 'subscribe') {
      newsub = 'unsubscribe'
   } else {
      newsub = 'subscribe'
   }
   await Reg.findByIdAndUpdate(id, { channel: newsub })
   console.log(record)
   res.redirect('/admin/user')
}