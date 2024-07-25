const express=require("express");
const router=express.Router();
const searchControllers=require("../../controllers/client/search.controllers.js");

router.get('/',searchControllers.index);


module.exports=router;


