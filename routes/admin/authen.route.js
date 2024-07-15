const express=require("express");
const router=express.Router();

const authen=require("../../controllers/admin/authen.controllers.js");

router.get('/login',authen.login);
router.post('/login',authen.loginPost);
router.get('/logout',authen.logout);

module.exports=router;