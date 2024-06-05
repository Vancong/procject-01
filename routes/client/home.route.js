const express=require("express");
const router=express.Router();
const homeControllers=require("../../controllers/client/home.controllers.js");
router.get('/',homeControllers.indexhome);

module.exports=router;