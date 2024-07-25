const cartDtb=require('../../models/cart.models');
module.exports= async(req,res,next)=>{
    if(!req.cookies.cartId) {
        const Cart= new cartDtb();
        await Cart.save();
        const time=365*24*60*60*1000;
        res.cookie('cartId',Cart.id,{ expires: new Date(Date.now() + time)});
    }
    else {
        const cartId=req.cookies.cartId;
        const cart= await cartDtb.findOne({
            _id:cartId
        })
        res.locals.cartTotal=cart.products.length||0;
    }
    next();
}