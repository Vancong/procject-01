const express=require("express");
const router=express.Router();
const userControllers=require("../../controllers/admin/user.controllers.js");

router.get('/',userControllers.index);

router.patch('/:status/:id',userControllers.changeStatus);

router.get('/edit/:id',userControllers.edit);

router.post('/edit/:id',userControllers.editP);

module.exports=router;