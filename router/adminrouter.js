 const router=  require('express').Router()
  const regc= require('../controllers/regcontroller')
  const blogc=  require('../controllers/blogcontroller')
 const handlelogin= require('../helpers/logincheckfunction')


router.get('/dashboard',(req,res)=>{
    const username=req.session.username
    res.render('admin/dashboard.ejs',{username})
})
router.get('/user',handlelogin,regc.adminuser)
router.get('/userstatus/:id',regc.statusupdate)
router.get('/deleteemail/:id',regc.deleteemail)
router.get('/substatus/:id',regc.substatus)




 module.exports= router