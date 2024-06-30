const express=require("express");
const router=express.Router();
const multer=require('multer');
const storageMulterHeplpers=require('../../helpers/storagemulter.helpers.js');
const validatesProduct=require('../../validates/admin/product.validates.js')


const upload=multer({storage: storageMulterHeplpers.storage});

const productsControllers=require("../../controllers/admin/products.controllers.js");
router.get('/',productsControllers.index);
router.patch('/change-status/:statusChange/:id',productsControllers.changeStatus);
router.patch('/change-multi',productsControllers.changeMulti);
router.patch('/delete/:id',productsControllers.delete); // xoa mem 1 san pham
router.patch('/changeposition/:id',productsControllers.changePosition); //thay doi vi tri


router.get('/edit/:id',productsControllers.showEdit); // trang sua sp
router.patch('/endEdit/:id',
    upload.single('thumbnail'),
    validatesProduct.validates,
    productsControllers.endEdit);

//chi tiet sp 
router.get('/detail/:id',productsControllers.detail);

//end detail


// them san pham
router.get('/create',productsControllers.create);
// router.post('/createProduct',productsControllers.createProduct);
router.post('/createProduct',
    upload.single('thumbnail'),
    validatesProduct.validates,
    productsControllers.createProduct);
//end











router.get('/trash',productsControllers.trash);
router.patch('/trash/back/:id',productsControllers.back); // khoi phuc 1 san pham

router.delete('/trash/deleteVv/:id',productsControllers.deleteVv); //xoa vinh vien 1 san pham
module.exports=router;

