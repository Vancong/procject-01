const product=require("../../models/product.models.js");

module.exports.index= async (req, res) => {
    const products= await product.find({   
        status: "active",
        deleted: false
    });
    
    for (const item of products) {
        item.priceNew=((100-item.discountPercentage)*0.01*item.price).toFixed(0);
    }
    console.log(products);
    res.render('client/pages/product/index.pug',
       { pageTitle: "Danh sach san pham",
         products:products
       }
    );
}







// module.exports.create=(req, res) => {
//      res.render('client/pages/product/create.pug');
// }
