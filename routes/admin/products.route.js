const express=require("express");
const router=express.Router();
const productsControllers=require("../../controllers/admin/products.controllers.js");
router.get('/',productsControllers.index);
router.patch('/change-status/:statusChange/:id',productsControllers.changeStatus);
router.patch('/change-multi',productsControllers.changeMulti);
router.patch('/delete/:id',productsControllers.delete); // xoa mem 1 san pham






router.get('/trash',productsControllers.trash);
router.patch('/trash/back/:id',productsControllers.back); // khoi phuc 1 san pham

router.delete('/trash/deleteVv/:id',productsControllers.deleteVv); //xoa vinh vien 1 san pham
module.exports=router;

