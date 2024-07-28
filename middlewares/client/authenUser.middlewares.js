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