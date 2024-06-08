module.exports.index= (req, res) => {
    res.render('admin/page/products/index.pug', {
      pageTitle: "Quan ly san pham"
    });
  };