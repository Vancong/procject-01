module.exports.validates=async  (req,res,next)=>{
    if(!req.body.title) {
        req.flash('error','vui long khong de trong');
        res.redirect("back");
        return;
    }
    next();
}