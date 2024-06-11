const Prodcut=require('../../models/product.models.js');

module.exports.index= async (req, res) => {
    const find= {
      deleted: false
    };

    // bo loc
    if(req.query.status){
      find.status=req.query.status;
    }

    // tim kiem
    let keyword="";

    if (req.query.keyword){
        const regax= new RegExp(req.query.keyword,"i");  //tim kiem tuong doi  "i" khong phan biet in hoa thuong
        find.title=regax;
        keyword=req.query.keyword;
    }

    //end tim kiem

    

    const products= await Prodcut.find(find);
    // console.log(products);

    res.render('admin/page/products/index.pug', {
      pageTitle: "Quan ly san pham",
      products: products,
      keyword: keyword
    });
  };