const express=require("express");
const router=express.Router();
const profileControllers=require("../../controllers/client/profile.controllers.js");
router.get('/',profileControllers.index);

module.exports=router;