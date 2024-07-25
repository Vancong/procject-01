const express=require("express");
const router=express.Router();
const cartControllers=require("../../controllers/client/cart.controllers.js");
router.get("/",cartControllers.index);
router.post('/add/:id',cartControllers.addPost);
router.get('/delete/:id',cartControllers.delete);
router.get('/:productId/:quantity',cartControllers.changeQuantity);
module.exports=router;