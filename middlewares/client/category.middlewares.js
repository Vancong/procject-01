const productsCategoryDtb=require('../../models/product-category.models');
const createTree=require('../../helpers/create-tree.helpers');
module.exports= async(req,res,next)=>{
    const productsCategory = await productsCategoryDtb.find({
        deleted: false,
        status: 'active'
    });
    const newProductsCategory = createTree(productsCategory);

    res.locals.layoutCategoryProducts=newProductsCategory;
    next();

}