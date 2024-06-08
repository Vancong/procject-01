const express=require("express");
const router=express.Router();
const productsControllers=require("../../controllers/admin/products.controllers.js");
router.get('/',productsControllers.index);

module.exports=router;