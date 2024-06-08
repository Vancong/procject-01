const dashboardRouter=require("./dashboard.route.js");
// const productRouter=require("./product.route.js");

module.exports.index=(app) => {
    app.use("/admin/dashboard",dashboardRouter);  
    // app.use("/product",productRouter);
}
