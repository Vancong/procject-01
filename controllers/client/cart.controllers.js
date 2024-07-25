const cartDtb=require('../../models/cart.models');
const productsDtb=require('../../models/product.models');
//[POST] /cart/add
module.exports.addPost=async (req,res) =>{
    const quantityAdd=parseInt(req.body.quantity); 
    const cartId=req.cookies.cartId;
    const productId=req.params.id;
    const cart=await cartDtb.findOne({
        _id:cartId
    })
   
    const existProductInCart= cart.products.find(item=> item.productId==productId );
    if(existProductInCart){
        
        const quantityInCart=0;
        const quantityInCar=existProductInCart.quantity;  
        const product= await productsDtb.findOne({
            _id: productId
        });
        const stock=product.stock;
        if(quantityAdd+quantityInCar<=stock) {

            await cartDtb.updateOne({
                _id:cartId,
                'products.productId': productId
            },{
                $set:{
                    'products.$.quantity': quantityAdd+ parseInt(existProductInCart.quantity)
                }
            })
        }
        
    }

    else {
        await cartDtb.updateOne({
            _id:cartId
        },{
            $push:{
                products:{
                    productId: productId,
                    quantity: quantityAdd
                }
            }
        })
    }

    
    // req.flash('success','Đã thêm vào giỏ hàng');
    res.redirect('back');
}

//[GET] /cart
module.exports.index=async(req,res) =>{
    const cart= await cartDtb.findOne({
        _id: req.cookies.cartId
    });
    var price=0;
    if(cart.products.length>0) {
        for (const item of cart.products) {
            const product= await productsDtb.findOne({
                _id:item.productId
            }).select(' title thumbnail discountPercentage slug price')
            product.priceNew=Math.floor((1-product.discountPercentage/100)*product.price);
            item.totalPrice=Math.floor(product.priceNew*item.quantity); 
            price+=item.totalPrice //tong gia tat ca sp
            item.productInfo=product;
        }
    }
    cart.totalPrice=price;
    
    // console.log(cart);
    res.render('client/pages/cart/index.pug',{
        pageTitle:'Giỏ hàng của bạn',
        cart:cart,
        cartDetail:cart
    })
}

//[GET] /cart/delete/:id
module.exports.delete=async(req,res) =>{
    try {
        const cartId=req.cookies.cartId;
        const productId=req.params.id;
        await cartDtb.updateOne({
            _id: cartId
        },{
            $pull:{
                products: {
                    productId: productId
                }
            }
        })
        res.redirect('back');

    } catch (error) {
        res.redirect('back');
    }
}

//[GET] /cart/:productId/:id
module.exports.changeQuantity= async (req,res) =>{
    try {
        const productId=req.params.productId;
        const quantity=parseInt(req.params.quantity);
        const cartId=req.cookies.cartId;
        await cartDtb.updateOne({
            _id:cartId,
            'products.productId':productId
        },{
            $set:{
                'products.$.quantity': quantity
            }
        })
        res.redirect('back');
    } catch (error) {
        res.redirect('back');
    }
}