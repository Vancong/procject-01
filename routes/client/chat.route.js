const express=require("express");
const router=express.Router();
const chatControllers=require("../../controllers/client/chat.controllers.js");
router.get("/",chatControllers.index);

module.exports=router;