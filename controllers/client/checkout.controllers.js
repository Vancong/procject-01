const productDtb=require('../../models/product.models');
const cartDtb = require('../../models/cart.models');
const oderDtb=require('../../models/oder.models');
//[GET] /checkout
module.exports.index=async (req,res) =>{
    const cartId=req.cookies.cartId;
    const cart=await cartDtb.findOne({
        _id:cartId
    });
    const productsSelected=cart.products.filter(item => item.isSelected==true);
    var totalPrice=0;
    for (const item of productsSelected) {
        const product=await productDtb.findOne({
            _id:item.productId
        }).select('title price thumbnail discountPercentage');
        product.priceNew=Math.floor((1-product.discountPercentage/100)*product.price);
        product.totalPrice=Math.floor(item.quantity*product.priceNew);
        totalPrice+=product.totalPrice;
        item.productNew=product;
    }
    productsSelected.totalPrice=totalPrice;

    res.render('client/pages/checkout/index.pug',{
        pageTitle:'Trang Đặt Hàng',
        productsSelected: productsSelected
    });
}

//[POST] /checkout  
module.exports.prouctsSlected=async(req,res) =>{
    const id=[];
    for (const item of req.body) {
        id.push(item.id);
    }
    const cartId=req.cookies.cartId;

    const cart= await cartDtb.findOne({
        _id:req.cookies.cartId
    })

    for (const item of cart.products) {
        await cartDtb.updateOne({
            _id:req.cookies.cartId,
            'products.productId':item.productId
        },{
            $set:{
                'products.$.isSelected':false
            }
        }) //  fix loi dat hang nhung khong tiep tuc mua
    }


    for (const productId of id) {
        await cartDtb.updateOne({
            _id: cartId,
            'products.productId': productId
        },{
            $set:{
                'products.$.isSelected': true
            }
        })
    } 
    if(id.length>0) {
        res.json({
            code:200
        })
    }
   
}

//[POST] /checkout/oder
module.exports.oderPost=async (req,res) =>{
    const userInfo=req.body;
    const cartId=req.cookies.cartId;
    const cart=await cartDtb.findOne({
        _id:cartId
    });
    const productsSelected=cart.products.filter(item => item.isSelected==true);
    const oderData={
        userInfo: userInfo,
        products:[]
    }
    for (const item of productsSelected) {
        const product=await productDtb.findOne({
            _id:item.productId
        }).select(' price discountPercentage');
        const data={
            productId: product.id,
            price: product.price,
            discountPercentage: product.discountPercentage,
            quantity: item.quantity
        }
        oderData.products.push(data);
    }
    
    const oder=  new oderDtb(oderData);
    await oder.save();
    
    for (const item of oderData.products) {
        await cartDtb.updateOne({
            _id: cartId
        },{
            $pull:{
                products:{
                    productId: item.productId
                }
            }
        })
      
    }

    res.redirect(`/checkout/success/${oder.id}`);
}

module.exports.success=async (req,res) =>{
    const oderId=req.params.oderId;
    const oder= await oderDtb.findOne({
        _id: oderId
    });
    var totalPrice=0;
    for (const item of oder.products) {
        const product=await productDtb.findOne({
            _id:item.productId
        }).select('title price thumbnail stock discountPercentage');
        product.priceNew=(1-product.discountPercentage/100)*product.price;
        product.totalPrice=item.quantity*product.priceNew;
        product.quantity=item.quantity;
        totalPrice+=product.totalPrice;
        item.product=product; 


        await productDtb.updateOne({
            _id: item.productId
        },{
            stock: product.stock-item.quantity
        })  //cap nhat lai so luong

    }
    totalPrice=totalPrice; 
    res.render('client/pages/checkout/success.pug',{
        pageTitle: 'Đặt hàng thành công',
        order: oder,
        totalPrice: totalPrice
    })
}