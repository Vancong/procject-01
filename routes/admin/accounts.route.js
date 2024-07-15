const express=require("express");
const router=express.Router();
const multer=require('multer');
const upload=multer();
const accounts=require("../../controllers/admin/accounts.controllers.js");
const uploadCloud=require('../../middlewares/admin/uploadCloud.js');

router.get('/',accounts.index);
router.get('/create',accounts.create);
router.post('/create',
             upload.single('avatar'),
             uploadCloud,
             accounts.createPost
            );
router.get('/edit/:id',accounts.edit);
router.patch('/edit/:id',
            upload.single('avatar'),
            uploadCloud,
            accounts.editPatch);

router.patch('/deleted/:id',accounts.deleted);
router.patch('/:status/:id',accounts.changeStatus);
router.get('/detail/:id',accounts.detail);



//thung rac trash
router.get('/trash',accounts.trash);
router.patch('/trash/back/:id',accounts.backAcc);
router.patch('/trash/deletedVv/:id',accounts.deletedVv);
//end
module.exports=router;