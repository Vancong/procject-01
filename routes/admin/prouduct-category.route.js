const express=require("express");
const router=express.Router();
const multer=require('multer');

const productCategory=require("../../controllers/admin/product-category.controllers.js");
const validatesProduct=require('../../validates/admin/product.validates.js')
const uploadCloud=require('../../middlewares/admin/uploadCloud.js');
const upload=multer();

router.get('/',productCategory.index);
router.get('/create',productCategory.create);
router.post('/createPost',
    upload.single('thumbnail'),
    uploadCloud
    ,
    validatesProduct.validates,
    productCategory.createPost);
router.get('/edit/:id',productCategory.edit);
router.patch('/edit/:id',
    upload.single('thumbnail'),
    uploadCloud
    ,
    validatesProduct.validates,
    productCategory.editPatch);
router.patch('/changestatus/:status/:id',productCategory.changeStatus);
router.get('/detail/:id',productCategory.detail);

module.exports=router;