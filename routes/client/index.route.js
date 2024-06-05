const homeRouter=require("./home.route.js");
const productRouter=require("./product.route.js");

module.exports.index=(app) => {
    app.use("/",homeRouter);  
    app.use("/product",productRouter);
}
