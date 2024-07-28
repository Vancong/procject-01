const express=require("express");
const router=express.Router();
const user=require("../../controllers/admin/user.controllers.js");

router.get('/',user.index);


module.exports=router;