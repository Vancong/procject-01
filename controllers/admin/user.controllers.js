const userDtb=require('../../models/user.models');

module.exports.index=async(req,res) =>{
    const user=await userDtb.find({
        deleted:false
    });
    res.render('admin/page/user/index.pug',{
        pageTitle: 'Tài khoản User',
        userAccount: user
    })

}