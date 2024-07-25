const homeRouter=require("./home.route.js");
const productRouter=require("./product.route.js");
const searchRouter=require('./search.route.js');
const checkoutRoute=require('./checkout.route.js');
const cartRoute=require('./cart.route.js');
const CategoryMiddlewares=require('../../middlewares/client/category.middlewares.js');
const cartMiddlewares=require('../../middlewares/client/cart.middlewares.js');
module.exports.index=(app) => {
    app.use(cartMiddlewares);
    app.use(CategoryMiddlewares);
    app.use("/",homeRouter);  
    app.use("/search",searchRouter);  
    app.use("/product",productRouter);
    app.use("/cart",cartRoute); 
    app.use("/checkout",checkoutRoute);
}
