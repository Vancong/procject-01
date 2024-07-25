const productsDtb = require('../../models/product.models');
module.exports.index= async(req,res) =>{
    const keyword = req.query.keyword;
    let products=[];
    if(keyword) {
        const regex = new RegExp(keyword, "i");
        products = await productsDtb.find({
            title: regex,
            status: "active",
            deleted: false
        });
    }
    for (const item of products) {
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }


    res.render('client/pages/search/index.pug',{
        pageTitle: 'Tìm kiếm',
        keyword: keyword,
        products: products
    })
}

