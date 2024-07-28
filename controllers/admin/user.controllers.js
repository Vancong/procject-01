const userDtb=require('../../models/user.models');
const md5=require('md5');
//[GET] /admin/user
module.exports.index=async(req,res) =>{
    const user=await userDtb.find({
        deleted:false
    });
    res.render('admin/page/user/index.pug',{
        pageTitle: 'Tài khoản User',
        userAccount: user
    })

}
//[PATCH] /admin/user/:status/:id
module.exports.changeStatus=async(req,res) =>{
    const status=req.params.status;
    const id=req.params.id;
    await userDtb.updateOne({
        _id:id
    },{
        status:status
    })
    req.flash('success','Cập nhật thành công');
    res.json({
        code:200
    })
}

//[GET] /admin/user/edit/:id
module.exports.edit=async(req,res) =>{
    const id=req.params.id;
    const userAccount=await userDtb.findOne({
        _id:id
    })
    res.render('admin/page/user/edit.pug',{
        pageTitle: 'Chỉnh sửa tài khoản User',
        userAccount: userAccount
    })

}

//[POST] /admin/user/edit/:id
module.exports.editP= async(req,res) =>{
    req.body.password=md5(req.body.password);
    await userDtb.updateOne({
        _id: req.params.id
    }, req.body)

    req.flash('success','Cập nhật thành công');
    res.redirect('back');

}