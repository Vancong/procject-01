const express=require("express");
const router=express.Router();
const dashboardControllers=require("../../controllers/admin/dashboard.controllers.js");
router.get('/',dashboardControllers.index);

module.exports=router;