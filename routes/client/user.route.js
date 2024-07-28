const express=require("express");
const router=express.Router();
const userControllers=require("../../controllers/client/user.controllers.js");

router.get('/register',userControllers.register);

router.post('/register',userControllers.registerPost);

router.get('/logout',userControllers.logout);

router.get('/login',userControllers.login);

router.post('/login',userControllers.loginPost);

router.get('/password/forgot',userControllers.forgotPassword);

router.patch('/password/forgot',userControllers.forgotPasswordPatch);

router.get('/password/otp',userControllers.otp);

router.patch('/password/otp',userControllers.otpPatch);

router.get('/password/reset',userControllers.resetPass);

router.patch('/password/reset',userControllers.resetPassPatch);

module.exports=router;




