const express=require("express");
const router=express.Router();
const profileControllers=require("../../controllers/client/profile.controllers.js");
const tokenMiddlewares=require('../../middlewares/client/authenUser.middlewares.js')
router.get('/',tokenMiddlewares.requireAuthen,profileControllers.index);

module.exports=router;