const accountsDtb = require('../../models/account.models');
const md5=require('md5');
const sytem=require('../../config/sytem');
// [GET] /admin/authen/login
module.exports.login=async(req,res)=>{
    res.render('admin/page/authen/login.pug',{
        pageTitle:'Trang Đăng Nhập'
    })
}

// [POST] /admin/authen/login
module.exports.loginPost=async(req,res)=>{
    const accounts=await accountsDtb.findOne({
        email: req.body.email
    })
    if(accounts==null){
        req.flash('error','Email không tồn tại trong hệ thống');
        res.redirect('back');
        return
    }

    req.body.password=md5(req.body.password);
    if(req.body.password!=accounts.password){
        req.flash('error','Sai password');
        res.redirect(`back`);
        return;
    }
   
    if(accounts.status!='active'){
        req.flash('error','Tài khoản đã bị khóa');
        res.redirect(`back`);
        return;
    }
    res.cookie('token',accounts.token);
    // ,{  expires:new Date(Date.now() + 30000)}
    req.flash('success','Đăng Nhập Thành Công');
    res.redirect(`${sytem.path.prefixAdmin}/dashboard`);
}

// [GET] /admin/authen/logout
module.exports.logout=(req,res)=>{
    res.clearCookie('token');
    res.redirect(`${sytem.path.prefixAdmin}/authen/login`);
}