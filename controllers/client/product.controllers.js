

module.exports.index=(req, res) => {
    res.render('client/pages/product/index.pug',
       { pageTitle: "Danh sach san pham"}
    );
}

// module.exports.create=(req, res) => {
//      res.render('client/pages/product/create.pug');
// }
