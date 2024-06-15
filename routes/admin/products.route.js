const express=require("express");
const router=express.Router();
const productsControllers=require("../../controllers/admin/products.controllers.js");
router.get('/',productsControllers.index);
router.patch('/change-status/:statusChange/:id',productsControllers.changeStatus);
router.patch('/change-multi',productsControllers.changeMulti);
module.exports=router;

