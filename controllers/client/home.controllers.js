const ProductsDtb=require('../../models/product.models');
module.exports.indexhome=  async(req, res) => {
    const ProductsFeatured= await ProductsDtb.find({
      deleted:false,
      status:'active',
      productsFeatured:'1'
    })
    .sort({position: 'desc'})
    .limit(6)
    .select('-description');

    for (const item of ProductsFeatured) {
      item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }

    const productsNew = await ProductsDtb
    .find({
      status: "active",
      deleted: false
    })
    .sort({ position: "desc" })
    .limit(6)
    .select("-description");

    for (const item of productsNew) {
      item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }
    res.render('client/pages/home/index.pug', {
      pageTitle: "Trang chu",
      productsNew: productsNew,
      productsFeatured: ProductsFeatured
    });
  };