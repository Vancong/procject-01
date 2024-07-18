const express=require("express");
const router=express.Router();
const profile=require("../../controllers/admin/profile.controllers.js");
const chagePassValidate=require('../../validates/admin/changepassword.validates.js');

router.get('/',profile.index);
router.get('/changepassword',profile.changepassword);
router.patch('/changepassword',chagePassValidate.validates,profile.changepasswordPatch);
module.exports=router;