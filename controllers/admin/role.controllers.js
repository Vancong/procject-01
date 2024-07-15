const roleDatabase=require('../../models/role.models');
const sytem=require('../../config/sytem.js')
// [GET] /admin/role/
module.exports.index=async(req,res) =>{
    const records=await roleDatabase.find({
        deleted: false
    });

    res.render('admin/page/role/index.pug',{
        pageTitle: 'Nhóm quyền',
        records: records
    })
}

// [GET] /admin/role/create
module.exports.create=async(req,res)=>{
    res.render('admin/page/role/create.pug')
}

// [POST] /admin/role/createPost
module.exports.createPost=async(req,res)=>{
    const newRole= new roleDatabase(req.body);
    await newRole.save();
    req.flash('success','cap nhat thanh cong');
    res.redirect(`${sytem.path.prefixAdmin}/role`);
    
}

// [PATCH] /admin/role/deleted xoa mem
module.exports.deleted=async(req,res) =>{
    try {
        const id=req.params.id;
        await roleDatabase.updateOne({
            _id:id
        },{
            deleted:true
        })
        req.flash('success','xoa thanh cong ');
        res.json({
            code:200
        })
    } catch (error) {
        res.redirect(`${sytem.path.prefixAdmin}/role`);
    }
}

// [GET] /admin/role/edit/:id giao dien
module.exports.edit=async(req,res)=>{
    try {
        const id=req.params.id;
        const record=await roleDatabase.findOne({
            _id:id
        },)
        if(record) {
            res.render('admin/page/role/edit.pug',{
                pageTitle: 'Chỉnh sửa nhóm quyền',
                record: record
            })
        }
    } catch (error) {
        res.redirect(`${sytem.path.prefixAdmin}/role`);
    }   
}

// [PATCH] /admin/role/edit/:id cap nhat dtb
module.exports.editPatch=async(req,res) =>{
    try {
        const id=req.params.id;
        await roleDatabase.updateOne({
            _id:id,
            deleted:false
        },
            req.body
        )
        req.flash('success','cap nhat thanh cong');
        res.redirect(`${sytem.path.prefixAdmin}/role`);
    } catch (error) {
        res.redirect(`${sytem.path.prefixAdmin}/role`);
    }
}


// [GET] /admin/role/permission/ Phan quyen
module.exports.permissions=async(req,res)=>{
    const records= await roleDatabase.find({
        deleted:false
    })
    
    res.render('admin/page/role/permission.pug',{
        pageTitle: 'Phân Quyền',
        records: records
    })
}


// [PATCH] /admin/role/permission/
module.exports.permissionsPatch=async(req,res)=>{
    const roles=req.body;

    for (const element of roles) {
        await roleDatabase.updateOne({
            _id: element.id,
            deleted:false
        },{
            permissions: element.permissions
        } )
    } 
    res.json({
        code:200,
        message: 'Cập nhật thành công'
    })
}