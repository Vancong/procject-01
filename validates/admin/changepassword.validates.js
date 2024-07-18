module.exports.validates=(req,res,next)=>{

    if(!req.body.passwordOld||!req.body.passwordNew) {
        req.flash('error','vui long khong de trong');
        res.redirect("back");
        return;
    }
    next();
}