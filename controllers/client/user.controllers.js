const userDtb=require('../../models/user.models');
const forgotPasswordDtb=require('../../models/forgot-password.models');
const generate=require('../../helpers/generate.helpers');
const md5=require('md5');
//[GET] /user/register
module.exports.register=(req,res) =>{

    res.render('client/pages/user/register.pug',{
        pageTitle:'Đăng ký tài khoản'
    })
}

//[POST] /user/register
module.exports.registerPost=async(req,res) =>{
    req.body.password=md5(req.body.password);
    const tokenUser=generate.generateRandomString(30);
    req.body.tokenUser=tokenUser
    const user=new userDtb(req.body);
    await user.save();
    res.cookie('tokenUser',tokenUser);
    req.flash('success','Đăng ký tài khoản thành công');
    res.redirect('/');

}

//[GET] /user/logout
module.exports.logout=(req,res) =>{
    res.clearCookie('tokenUser');
    res.redirect('/user/login');
}

//[GET] /user/login
module.exports.login=(req,res) =>{
    res.render('client/pages/user/login.pug',{
        pageTitle:'Đăng nhập tài khoản'
    })
}

//[POST] /user/login
module.exports.loginPost= async(req,res) =>{
   const email=req.body.email;
   const password=md5(req.body.password);
   const user= await userDtb.findOne({
        email: email
   });
   if (!user) {
        req.flash('error','Bạn đã nhập sai email');
        res.redirect('back');
        return;
   }

   if(user.status=='inactive'){
        req.flash('error','Tài khoản đã bị khóa');
        res.redirect('back');
        return;
   }

   if(password==user.password) {
        res.cookie('tokenUser',user.tokenUser);
        req.flash('success','Đăng nhập thành công');
        res.redirect('/');
        return;
   }
   req.flash('error','Bạn đã nhập sai mật khẩu');
   res.redirect('back');

}

//[GET] /user/password/forgot
module.exports.forgotPassword=(req,res) =>{
    res.render('client/pages/user/forgot-password.pug',{
        pageTitle:'Quên mật khẩu'
    })
}

//[PATCH] /user/password/forgot
module.exports.forgotPasswordPatch=async(req,res) =>{
    const user=await userDtb.findOne({
        email: req.body.email
    });
    if(!user) {
        req.flash('error','Email không tồn tại trong hệ thống');
        res.redirect('back');
        return;
    }

    if(user.status=='inactive'){
        req.flash('error','Tài khoản đã bị khóa');
        res.redirect('back');
        return;
   }
    //tao ma otp luu vao dtb
    const otp=generate.generateRandomNumber(6);
    const forgotPassword={
        otp:otp,
        email: req.body.email,
        expireAt: Date.now()+(3*60*1000)
    }
    const forgot= new forgotPasswordDtb(forgotPassword);
    await forgot.save();

    res.redirect(`/user/password/otp?email=${req.body.email}`);
}

//[GET] /user/password/resetOtp/:email
module.exports.resetOtp=async(req,res)=>{
    const emailUser=req.params.email;
    const email=await userDtb.findOne({
        email: emailUser
    });
    await forgotPasswordDtb.deleteMany({
        email: emailUser
    })
    //tao ma otp luu vao dtb
    const otp=generate.generateRandomNumber(6);
    const forgotPassword={
        otp:otp,
        email: emailUser,
        expireAt: Date.now()+(3*60*1000)
    }
    const forgot= new forgotPasswordDtb(forgotPassword);
    await forgot.save();
}

//[GET] /user/password/otp/email
module.exports.otp= (req,res) =>{
    res.render('client/pages/user/otp-password.pug',{
        pageTitle:'Nhập mã xác thực',
        email:req.query.email
    })
}

//[PATCH] /user/password/otp
module.exports.otpPatch=async(req,res) =>{
    const otp=req.body.otp;
    const email=req.body.email;
    const forgotPassword= await forgotPasswordDtb.findOne({
        email: email,
        otp:otp
    });
    if(!forgotPassword) {
        req.flash('error','Mã không hợp lệ');
        res.redirect('back');
        return;
    }
    const tokenUser=await userDtb.findOne({
        email:email
    })  

    res.cookie('tokenUser',tokenUser.tokenUser);
    res.redirect('/user/password/reset');
}

//[GET] /user/password/reset
module.exports.resetPass= (req,res) =>{
    res.render('client/pages/user/resetpassword.pug',{
        pageTitle:'Đặt lại mật khẩu'
    })
}

//[PATCH] /user/password/reset
module.exports.resetPassPatch=async(req,res) =>{
    const password=md5(req.body.password);
    const tokenUser=req.cookies.tokenUser;
    await userDtb.updateOne({
        tokenUser: tokenUser
    },{
        password:password
    })
    res.redirect('/');
}