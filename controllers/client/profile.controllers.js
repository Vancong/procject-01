const userDtb=require('../../models/user.models');

//[GET] /user/profile/:id
module.exports.index=async(req,res) =>{
    const token=req.cookies.tokenUser;
    const user= await userDtb.findOne({
        tokenUser: token
    });
    res.render('client/pages/profile/index.pug',{
        pageTitle: user.fullName,
        user: user
    })
}