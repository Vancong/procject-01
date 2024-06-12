const Prodcut=require('../../models/product.models.js');

module.exports.index= async (req, res) => {
    const find= {
      deleted: false
    };

    const filterStatus=[
      {
        label: "Tất cả",
        value: ""
      },
      {
        label:"Hoạt động",
        value: "active"
      },
      {
        label:"Dừng Hoạt động",
        value: "inactive"
      }
    ];




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


    //phan trang

    const pagination={
        currentPage:1,
        limitItem:4
    };
    if (req.query.page) {
        pagination.currentPage=parseInt(req.query.page);
    }
    pagination.skip=(pagination.currentPage-1)*pagination.limitItem;

    const countProduct= await Prodcut.countDocuments(find); // tinh tong so ban ghi
    const sumPage=Math.ceil(countProduct/pagination.limitItem);
    pagination.totalPage=sumPage;
    console.log(pagination);

    //end phan trang  await Prodcut
    

    const products= await Prodcut
      .find(find)   // him tim kiem
      .limit(pagination.limitItem)     // gioi han bao nhieu ban ghi
      .skip(pagination.skip);     // tim  tu trang bao nhieu

    // console.log(products);

    res.render('admin/page/products/index.pug', {
      pageTitle: "Quan ly san pham",
      products: products,
      keyword: keyword,
      filterStatus:filterStatus,
      pagination: pagination
    });
  };

  