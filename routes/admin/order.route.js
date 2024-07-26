const express=require("express");
const router=express.Router();
const orderControllers=require("../../controllers/admin/order.controllers.js");


router.get('/',orderControllers.index);
router.get('/detail/:id',orderControllers.detail);
router.patch('/delete/:id',orderControllers.delete);
module.exports=router;