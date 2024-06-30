const Product=require("../../models/product.models.js");


module.exports.index= async (req, res) => {
    const products= await  Product.find({   
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
module.exports.detail=async (req,res) =>{
    const slug=req.params.slug;
    const product=await Product.findOne({
        slug:slug,
        deleted: false,
        status: "active"
    });
    if (product) {
        res.render('client/pages/product/detail.pug',{
            pageTitle: "Chi Tiết Sản Phẩm",
            product: product
        })
    }
    else {
        res.redirect('/product');
    }
}







// module.exports.create=(req, res) => {
//      res.render('client/pages/product/create.pug');
// }
