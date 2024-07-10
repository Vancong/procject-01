const dashboardRouter=require("./dashboard.route.js");
const productsRouter=require("./products.route.js");
const productCategory=require("./prouduct-category.js");
const renameLink=require('../../config/sytem.js');
module.exports.index=(app) => {
    const path=renameLink.path.prefixAdmin;  //ojec path cham vao phan tu prefix
    app.use(`${path}/dashboard`,dashboardRouter);  
    app.use(`${path}/product`,productsRouter);
    app.use(`${path}/product-category`,productCategory);
}
