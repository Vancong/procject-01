const express=require("express");
const router=express.Router();
const checkoutControllers=require("../../controllers/client/checkout.controllers.js");
router.get("/",checkoutControllers.index);
router.post("/",checkoutControllers.prouctsSlected); //lay id
router.post('/order',checkoutControllers.oderPost);
router.get('/success/:oderId',checkoutControllers.success);

module.exports=router;