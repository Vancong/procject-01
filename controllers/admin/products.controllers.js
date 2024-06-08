const Prodcut=require('../../models/product.models.js');

module.exports.index= async (req, res) => {
    const products= await Prodcut.find({
      deleted: false
    });
    console.log(products);
    res.render('admin/page/products/index.pug', {
      pageTitle: "Quan ly san pham",
      products: products
    });
  };