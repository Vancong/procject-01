const dashboardRouter=require("./dashboard.route.js");
const productsRouter=require("./products.route.js");
const productCategory=require("./prouduct-category.route.js");
const role=require('./role.route.js');
const accounts=require('./accounts.route.js');
const authen=require('./authen.route.js');
const profile=require('./profile.route.js')
const order=require('./order.route.js');
const user=require('./user.route.js');
const setting=require('./setting.route.js');
const authenMiddlewares=require('../../middlewares/admin/authen.middewares.js');
const renameLink=require('../../config/sytem.js');

module.exports.index=(app) => {
    const path=renameLink.path.prefixAdmin;  //ojec path cham vao phan tu prefix
    app.use(`${path}/dashboard`,authenMiddlewares,dashboardRouter);  
    app.use(`${path}/product`,authenMiddlewares,productsRouter);
    app.use(`${path}/product-category`,authenMiddlewares,productCategory);
    app.use(`${path}/role`,authenMiddlewares,role);
    app.use(`${path}/accounts`,authenMiddlewares,accounts);
    app.use(`${path}/authen`,authen);
    app.use(`${path}/profile`,authenMiddlewares,profile);
    app.use(`${path}/order`,authenMiddlewares,order);
    app.use(`${path}/user`,authenMiddlewares,user);
    app.use(`${path}/setting`,authenMiddlewares,setting);
}
