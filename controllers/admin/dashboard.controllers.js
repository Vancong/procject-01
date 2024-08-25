const userDtb=require('../../models/user.models');
const productDtb=require('../../models/product.models');
const orderDtb=require('../../models/oder.models');
const accAdminDtb=require('../../models/account.models');
//[GET] /admin/dashboard
module.exports.index= async (req, res)  => {

  
  const data={
    accAdmin:{},
    user:{},
    product:{},
    order:{}
  };

  data.accAdmin.active= await accAdminDtb.countDocuments({
    deleted:false,
    status: 'active'
  })

  data.accAdmin.total= await accAdminDtb.countDocuments({
      deleted:false,
  })

  data.accAdmin.inactive= await accAdminDtb.countDocuments({
    deleted:false,
    status: 'inactive'
  }) 
  
  //user
  data.user.active= await userDtb.countDocuments({
    deleted:false,
    status: 'active'
  })

  data.user.total= await userDtb.countDocuments({
      deleted:false,
  })

  data.user.inactive= await userDtb.countDocuments({
    deleted:false,
    status: 'inactive'
  }) 

  //order


  data.order.total= await orderDtb.countDocuments({
  })



  //product
  data.product.active= await productDtb.countDocuments({
    deleted:false,
    status: 'active'
  })

  data.product.total= await productDtb.countDocuments({
      deleted:false,

  })

  data.product.inactive= await productDtb.countDocuments({
    deleted:false,
    status: 'inactive'
  }) 




    res.render('admin/page/dashboard/index.pug', {
      pageTitle: "Trang tong quan",
      data: data
    });
  };