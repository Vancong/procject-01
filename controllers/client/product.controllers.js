const ProductDtb=require("../../models/product.models.js");
const productCategoryDtb=require('../../models/product-category.models.js');
const cartDtb=require('../../models/cart.models.js');
//[GET] /product/
module.exports.index= async (req, res) => {
    const products= await  ProductDtb.find({   
        status: "active",
        deleted: false,
    }).sort(
        {
            position: "desc"
        }
    );
    
    for (const item of products) {
        item.priceNew=((100-item.discountPercentage)*0.01*item.price).toFixed(0);
    }

    res.render('client/pages/product/index.pug',
       { pageTitle: "Danh sach san pham",
         products:products
       }
    );
}

//[GET] /product/:slugCategory
module.exports.category= async (req, res) => {
    const slugCategory=req.params.slugCategory;
    const category=await productCategoryDtb.findOne({
        slug:slugCategory
    });
    const allSubCategory=[];
    const getSubCategory= async (cureenId) =>{
        const SubCategory= await productCategoryDtb.find({
            parent_id: cureenId,        
            status: "active",
            deleted: false
         
        });
        if(SubCategory) {
            for (const item of SubCategory) {
                allSubCategory.push(item.id);
                await getSubCategory(item.id);
            }    
        }
       
    }
    await getSubCategory(category.id);
    const products= await  ProductDtb.find({  
        product_category_id: { $in: [category.id,...allSubCategory]} ,
        status: "active",
        deleted: false
    }).sort({
        position: 'desc'
    });
    
    for (const item of products) {
        item.priceNew=((100-item.discountPercentage)*0.01*item.price).toFixed(0);
    }

    res.render('client/pages/product/index.pug',
       { pageTitle: category.title,
         products:products
       }
    );
}

//[GET] /product/detail/:slug
module.exports.detail=async (req,res) =>{
    const slug=req.params.slug;
    const product=await ProductDtb.findOne({
        slug:slug,
        deleted: false,
        status: "active"
    });
    const cartId=req.cookies.cartId;
    const cart=await cartDtb.findOne({
        _id:cartId,
    });
    const currentProduct= cart.products.find(item=> item.productId==product.id)||0;
    if (product) {
        product.priceNew = ((1 - product.discountPercentage/100) * product.price).toFixed(0);
        res.render('client/pages/product/detail.pug',{
            pageTitle: "Chi Tiết Sản Phẩm",
            product: product,
            quantity:currentProduct.quantity 
        })
    }
    else {
        res.redirect('/product');
    }
}







// module.exports.create=(req, res) => {
//      res.render('client/pages/product/create.pug');
// }
