const dashboardRouter=require("./dashboard.route.js");
const productsRouter=require("./products.route.js");

module.exports.index=(app) => {
    app.use("/admin/dashboard",dashboardRouter);  
    app.use("/admin/products",productsRouter);
}
