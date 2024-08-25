const userDtb=require('../../models/user.models');
module.exports= async(req,res,next)=>{
    if(req.cookies.tokenUser) {
       const user=await userDtb.findOne({
            tokenUser:req.cookies.tokenUser
       })
       
       res.locals.user=user;
    }
    next();
}

module.exports.requireAuthen=async (req,res,next) =>{
    if(!req.cookies.tokenUser) {
        res.redirect('/user/login');
        return;
    }
    const user=await userDtb.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false
    });
    
    if(!user) {
        res.redirect('/user/login');
        return;
    }
    next();

}