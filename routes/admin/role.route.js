const express=require("express");
const router=express.Router();
const role=require("../../controllers/admin/role.controllers.js");

router.get('/',role.index);
router.get('/create',role.create)
router.post('/createPost',role.createPost)
router.patch('/deleted/:id',role.deleted);
router.get('/edit/:id',role.edit);
router.patch('/edit/:id',role.editPatch)

router.get('/permissions',role.permissions)
router.patch('/permissions',role.permissionsPatch)

module.exports=router;