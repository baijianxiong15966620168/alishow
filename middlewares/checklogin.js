
module.exports = (req,res,next) => {
    if(req.originalUrl == '/admin/login') { 
        return next();
    }
    let user = req.session.user;
    if(!user) {
        return res.redirect('/admin/login')
    }
    next();
}