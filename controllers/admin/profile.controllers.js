const md5=require('md5');
const accountsDtb=require('../../models/account.models');
//[GET] /admin/profile
module.exports.index=(req,res)=>{
    res.render('admin/page/profile/index.pug',{
        pageTitle: 'Trang Cá Nhân'
    })
}

//[GET] /admin/profile/changepassword
module.exports.changepassword= (req,res) =>{
    res.render('admin/page/profile/changepassword.pug',{
        pageTitle: 'Đổi mật khẩu'
    })
}

//[PATCH] /admin/profile/changepassword
module.exports.changepasswordPatch=async(req,res) =>{
    const passOld=md5(req.body.passwordOld);
    const passNew=md5(req.body.passwordNew);
    const account=res.locals.account;
    if(passOld!=account.password){
        req.flash('error','Sai mật khẩu cũ');
        res.redirect('back');
        return;
    }
    if(passNew==account.password){
        req.flash('error','Không nhập lại mật khẩu cũ');
        res.redirect('back');
        return;
    }
    await accountsDtb.updateOne({
        _id:account.id
    },{
        password: passNew
    })
    req.flash('success','Đổi mật khẩu thành công');
    res.redirect('back');
}