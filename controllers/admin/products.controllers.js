const Prodcut=require('../../models/product.models.js');

module.exports.index= async (req, res) => {
    const find= {
      deleted: false
    };

    if(req.query.status){
      find.status=req.query.status;
    }

    const products= await Prodcut.find(find);

    // console.log(products);



    res.render('admin/page/products/index.pug', {
      pageTitle: "Quan ly san pham",
      products: products
    });
  };