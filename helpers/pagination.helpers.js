const Product=require('../models/product.models.js')
module.exports= async (req,find) => {
    const pagination={
        currentPage:1,
        limitItem:4
    };
    if (req.query.page) {
        pagination.currentPage=parseInt(req.query.page);
    }
    pagination.skip=(pagination.currentPage-1)*pagination.limitItem;

    const countProduct= await Product.countDocuments(find); // tinh tong so ban ghi
    const sumPage=Math.ceil(countProduct/pagination.limitItem);
    pagination.totalPage=sumPage;
    return pagination;
}
