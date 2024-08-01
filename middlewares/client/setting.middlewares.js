const settingDtb=require('../../models/setting.models');
module.exports= async(req,res,next)=>{
    const setting=await settingDtb.findOne({});
    if(setting) {
        res.locals.setting=setting;
    }

    next();

}