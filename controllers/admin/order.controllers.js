const orderDtb=require('../../models/oder.models');
const productDtb=require('../../models/product.models');

//[GET] /amdin/order
module.exports.index=async(req,res) =>{ 
    if(res.locals.user.permissions.includes('order_view')){
        const pagination={
            currentPage:1,
            limitItem:7
        };
        if (req.query.page) {
            pagination.currentPage=parseInt(req.query.page);
        }
        pagination.skip=(pagination.currentPage-1)*pagination.limitItem;
    
        const countProduct= await orderDtb.countDocuments(); // tinh tong so ban ghi
        const sumPage=Math.ceil(countProduct/pagination.limitItem);
        pagination.totalPage=sumPage;
    
        const productsOrder=await orderDtb.find()
        .limit(pagination.limitItem)
        .skip(pagination.skip)
        .sort({
            createdAt:'desc'
        });
        res.render('admin/page/order/index.pug',{
            pageTitle: 'Quản lý đơn hàng',
            order: productsOrder,
            pagination
        })
    }
   
}

//[GET] /amdin/order/detail:id
module.exports.detail=async(req,res) =>{
    if(res.locals.user.permissions.includes('order_view')){
        try {
            const orderId=req.params.id;
            const order= await orderDtb.findOne({
                _id: orderId
            });
            const orderUser={
                userInfo: order.userInfo,
                products: []
            };
            var totalPrice=0;
            for (const item of order.products) {
                const product= await productDtb.findOne({
                    _id: item.productId
                }).select('title thumbnail ');
                product.priceNew= Math.floor((1-item.discountPercentage/100)*item.price);
                totalPrice+=item.quantity*product.priceNew;
                product.quantity=item.quantity;
                orderUser.products.push(product);
            }
            orderUser.totalPrice=totalPrice;
    
            res.render('admin/page/order/detail.pug',{
                pageTitle: 'Chi tiết đơn hàng',
                orderUser:orderUser
            });
        } catch (error) {
            res.redirect('back');
        }
    }
}

//[PATCH] /amdin/order/delete:id
module.exports.delete=async(req,res) =>{
    if(res.locals.user.permissions.includes('order_delete')){
        try {
            const orderId=req.params.id;
            await orderDtb.deleteOne({
                _id:orderId
            })
            req.flash('success','Xóa đơn hàng thành công');
            res.json({
                code:200
            })
        } catch (error) {
            res.redirect('back');
        }
    }
  
}