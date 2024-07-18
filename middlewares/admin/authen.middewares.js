const accountsDtb=require('../../models/account.models');
const roleDtb=require('../../models/role.models');
const sytem=require('../../config/sytem');
module.exports= async(req,res,next)=>{
   const token=req.cookies.token;
   if(!token) {
        res.redirect(`${sytem.path.prefixAdmin}/authen/login`);
   }
   const account= await accountsDtb.findOne({
        token: token,
        status: 'active',
        deleted:false
   });
   if(!account) {
       res.redirect(`${sytem.path.prefixAdmin}/authen/login`);
       return;
   }
     const role=await roleDtb.findOne({
          _id:account.role_id,
          deleted:false
     }).select('permissions title');
     account.permissions=role.title; // lay ten quyen
     res.locals.account=account; 
     res.locals.user=role; //phan quyen
     next();

}