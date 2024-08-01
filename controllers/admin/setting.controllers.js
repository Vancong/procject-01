const settingDtb=require('../../models/setting.models');
// [GET] /setting/general
module.exports.general=async(req,res) =>{

    const setting= await settingDtb.findOne();
    res.render('admin/page/setting/general.pug',{
        pageTitle: 'Cài đặt chung',
        setting: setting
    })
}

// [PATCH] /setting/general
module.exports.generalPatch=async(req,res) =>{
    
    const setting= await settingDtb.findOne();
    if(setting) {
        await settingDtb.updateOne({
            _id:setting.id
        },
            req.body
        )
    }
    else {
        const record= new settingDtb(req.body);
        await record.save();
    }

    req.flash('success','Cập nhật thành công');
    res.redirect('back');
}