function checksubscription(req,res,next){
    if(req.session.sub=='subscribed'){
        next()
    }else{
        res.render('suberro.ejs')
    }
}

module.exports  = checksubscription