const express=require("express");
const router=express.Router();
const multer=require('multer');
const settingControllers=require("../../controllers/admin/setting.controllers.js");
const uploadCloud=require('../../middlewares/admin/uploadCloud.js');
const upload=multer();


router.get('/general',settingControllers.general);

router.patch('/general',
    upload.single('logo'),
    uploadCloud,
    settingControllers.generalPatch);





module.exports=router;