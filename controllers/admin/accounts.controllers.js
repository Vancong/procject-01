
const roleDatabase=require('../../models/role.models');
const generate=require('../../helpers/generate.helpers.js');
const accountsDatabase=require('../../models/account.models.js');
const sytem=require('../../config/sytem.js');

const md5 = require('md5');
// [GET] /admin/accounts/
module.exports.index=async(req,res) =>{
    const records=await accountsDatabase.find({
        deleted:false
    })
    for (const iterator of records) {
        const role= await roleDatabase.findOne({
            _id: iterator.role_id,
            deleted:false
        });
       iterator.roleTitle=role.title;
    }

 
    res.render('admin/page/accounts/index.pug',{
        pageTitle:'Tài khoản Admin',
        records: records
    })
}


// [GET] /admin/accounts/create
module.exports.create=async(req,res)=>{

    const role=await roleDatabase.find({
        deleted:false
    }).select('title');
    res.render('admin/page/accounts/create.pug',{
        pageTile:'Tạo tài khoản',
        roles:role
    })
}

// [POST] /admin/accounts/create
module.exports.createPost=async(req,res)=>{
    if(res.locals.user.permissions.includes('accadmin_create')) {
        req.body.token=generate.generateRandomString(30);
        req.body.password=md5(req.body.password);
        const newAccount= new accountsDatabase(req.body);
        await newAccount.save();
        req.flash('success','Tạo tài khoản thành công');
        res.redirect(`${sytem.path.prefixAdmin}/accounts`);
    }
    else {
        res.send('403');
    }
}

// [GET] /admin/accounts/:edit
module.exports.edit=async(req,res) =>{
    try {
        const id=req.params.id;
        const account=await accountsDatabase.findOne({
            _id:id,
            deleted:false
        })
        const role=await roleDatabase.find({     
            deleted:false
        }).select('title');
        if(account){
            res.render('admin/page/accounts/edit.pug',{
                pageTitle:'Chỉnh sửa tài khoản',
                account: account,
                role:role
            })
        }
        
    } catch (error) {
        res.redirect(`${sytem.path.prefixAdmin}/accounts`);
    }
}

// [PATCH] /admin/accounts/:edit
module.exports.editPatch=async(req,res)=>{
    if(res.locals.user.permissions.includes('accadmin_edit')) {
        try {
            const id=req.params.id;
            const account=await accountsDatabase.findOne({
                _id:id,
                deleted:false
            });
            if(req.body.password) {
                 req.body.password=md5(req.body.password);
            }
            // console.log(req.body.role_id);
            await accountsDatabase.updateOne({
                _id:id,
                deleted:false
            }, req.body)
            req.flash('success','update thanh cong');
            res.redirect(`${sytem.path.prefixAdmin}/accounts`);
        } catch (error) {
            res.redirect(`${sytem.path.prefixAdmin}/accounts`);
        }
    }
    else{
        res.send('403');
    }
}

// [PATCH] /admin/accounts/deleted/:edit
module.exports.deleted=async(req,res)=>{
    if(res.locals.user.permissions.includes('accadmin_delete')){
        const id=req.params.id;
        await accountsDatabase.updateOne({
            _id:id
        },{
            deleted:true
        })
        req.flash('success','xoa thanh cong');
        res.json({
            code:200
        }) 
    }
    else {
        res.send('403');
    }
    
}

// [GET] /admin/accounts/trash
module.exports.trash=async(req,res)=>{
    const accounts= await accountsDatabase.find({
        deleted:true
    })

    for (const acc of accounts) {
        const role=await roleDatabase.findOne({
            _id:acc.role_id,
            deleted:false
        })
        acc.roleTitle=role.title;
    }

    res.render('admin/page/accounts/trash.pug',{
        pageTile:'Trash',
        accounts: accounts
    })
}

// [PATCH] /admin/accounts/trash/back/:id
module.exports.backAcc=async(req,res)=>{
    if(res.locals.user.permissions.includes('accadmin_delete')) {
        const id=req.params.id;
        await accountsDatabase.updateOne({
            _id:id
        },{
            deleted:false
        })
        req.flash('success','Khôi phục thành công');
        res.json({
            code:200
        })
    }
    else {
        res.send('ok');
    }
}


// [PATCH] /admin/accounts/trash/deleted/:id
module.exports.deletedVv=async(req,res)=>{
    if(res.locals.user.permissions.includes('accadmin_delete')) {
            const id=req.params.id;
        await accountsDatabase.deleteOne({
            _id:id
        })
        req.flash('success','Xóa thành công');
        res.json({
            code:200
        })
    }
    else {
        res.send('ok');
    }
}

// [PATCH] /admin/accounts/:status/:id
module.exports.changeStatus=async(req,res)=>{
    if(res.locals.user.permissions.includes('accadmin_edit')) {
        const status=req.params.status;
        const id=req.params.id;
        await accountsDatabase.updateOne({
            _id:id,
            deleted: false
        },{
            status: status
        })
        req.flash('success','Thay đổi trạng thái thành công');
        res.json({
            code:200
        })
    }
    else {
        res.send('ok');
    }
   
}

// [GET] /admin/accounts/detail/:id

module.exports.detail=async(req,res)=>{
    try {
        const id=req.params.id;
        const account=await accountsDatabase.findOne({
            _id:id,
            deleted:false
        })

        if(account) {
            res.render('admin/page/accounts/detail.pug',{
                pageTitle:'Chi tiết tài khoản',
                account:account
            })
        }
       
    } catch (error) {
        res.redirect(`${sytem.path.prefixAdmin}/accounts`)
    } 
}