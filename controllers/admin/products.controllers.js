const Product=require('../../models/product.models.js');
const Productcategory=require('../../models/product-category.models.js')
const createTree=require('../../helpers/create-tree.helpers.js')
const sytem=require('../../config/sytem.js')
const paginationHelpers=require('../../helpers/pagination.helpers.js')
const moment=require('moment');
const accountsDtb = require('../../models/account.models.js');
const roleDtb = require('../../models/role.models.js');
// [GET] /admin/product
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
    //phan trang
    const pagination = await paginationHelpers(req,find);
    //sort
    const sort_1={};
    if(req.query.value&&req.query.key) {
        sort_1[req.query.key]=`${req.query.value}`;
        // console.log(sort_1);
    }
    else {
      sort_1.position='desc'
    }

    //end sort
    

    const products= await Product
      .find(find)   // him tim kiem
      .limit(pagination.limitItem)     // gioi han bao nhieu ban ghi
      .skip(pagination.skip)    // tim  tu trang bao nhieu
      .sort(
          sort_1
      );

    res.render('admin/page/products/index.pug', {
      pageTitle: "Quan ly san pham",
      products: products,
      keyword: keyword,
      filterStatus:filterStatus,
      pagination: pagination
    });
};
 
  // [PATCH] /admin/product/change-status/:statusChange/:id
module.exports.changeStatus= async (req,res) => {
if(res.locals.user.permissions.includes('products_create')) {
  try {
    const {id,statusChange}=req.params;
    await Product.updateOne({
      _id: id
    },  {
      status: statusChange
    });
    
 
    req.flash('success', 'Cập nhật trạng thái thành công!');
    res.json( {
      code:200     
    });
    
  } catch (error) {
    res.redirect(`${sytem.path.prefixAdmin}/product`);
  }
}
}

//  [PATCH] /admin/product/change-multi
module.exports.changeMulti= async (req,res) => {
  if(res.locals.user.permissions.includes('products_create')) {
    const {status,idf}=req.body;
    if(status){
        if(status=='active'||status=='inactive'){
            await Product.updateMany({
              _id: idf
            },  {
              status: status
            });
        }
        else if(status=='delete') {
          await Product.updateMany({
            _id: idf
          },  {
            deleted:true
          });
        }
        else if(status=='back'){
          await Product.updateMany({
            _id: idf
          },{
            deleted: false
          })
          req.flash('success','Khôi phục thành công!')  
        }
        else if(status=='deleteAll'){
          await Product.deleteMany({
            _id:idf
          })
        }
    }
  
    res.json( {
      code:200     
    });
  }
  else {
    res.send('403');
  } 
}

//  [PATCH] /admin/product/delete/:id
module.exports.delete= async (req,res) => {
  if(res.locals.user.permissions.includes('products_delete')) { 
    try {
      const id=req.params.id;
    // console.log(id);
      await Product.updateOne({
        _id: id
      },{
        deleted: true,
        deletedBy: res.locals.account.id
      })
      
      req.flash('success','Xóa thành công 1 sản phẩm!')
      res.json( {  //chuyen js sang json
          code:200
      });
    } catch (error) {
      res.redirect(`${sytem.path.prefixAdmin}/product`);
    }
  }
  else {
    res.send('403');
  } 
}



//  [PATCH] /admin/product//changeposition/:id
module.exports.changePosition= async(req,res) =>{
  if(res.locals.user.permissions.includes('products_create')) {
    const position=req.body.position;
    const id=req.params.id;
    // console.log(position);
    // console.log(id);
    
    await Product.updateOne({
      _id:id
    },{
      position: position
    })
    req.flash('success','Đổi vị trí thành công!')
    res.json({
      code: 200
    })
  }
  else {
    res.send('403');
  } 
}

//  [GET] /admin/product/create
module.exports.create= async (req,res) => {
  const categories=await Productcategory.find({
    deleted: false
  })
  const newCategories=createTree(categories); 
  res.render('./admin/page/products/create.pug',{
    pageTitle: "Thêm Sản Phẩm",
    
    categories: newCategories
  });
}
//  [POST] /admin/product/create
module.exports.createProduct= async (req,res) => {
  if(res.locals.user.permissions.includes('products_create')){
      req.body.price=parseInt(req.body.price);
      req.body.stock=parseInt(req.body.stock);
      req.body.discountPercentage=parseInt(req.body.discountPercentage);
      if(req.body.position) {
        req.body.position=parseInt(req.body.position);
      }
      else {
        const cout=await Product.countDocuments()+1;
        req.body.position=cout;
      }
      req.body.createBy=res.locals.account.id;
      
      console.log(req.body.createBy);
      const newProduct=new Product(req.body);
      await newProduct.save();
      res.redirect(`${sytem.path.prefixAdmin}/product`);   
    // console.log(req.body);
  }
  else {
    res.send('403')
  }
 
 
}









//  [GET] /admin/product/edit/:id
module.exports.showEdit=async (req,res) => {
  try {
    const id=req.params.id;
    const find={
      _id: id,
      deleted: false
    }
    const categories=await Productcategory.find({
      deleted: false
    })
    const newCategories=createTree(categories);

    const products= await Product.findOne(find);
    if(products) {
      res.render('admin/page/products/showEdit.pug',{
        pageTitle: "Edit San pham",
        product: products,
        categories: newCategories
      });
    }
    else {
      res.redirect(`${sytem.path.prefixAdmin}/product`);
    }
    
  } catch (error) {
    res.redirect(`${sytem.path.prefixAdmin}/product`);
  }
}

//  [PATCH] /admin/product/endEdit/:id
module.exports.endEdit=async (req,res) =>{
    if((res.locals.user.permissions.includes('products_create'))){
      try {
        const id=req.params.id;
          req.body.price=parseInt(req.body.price);
          req.body.stock=parseInt(req.body.stock);
          req.body.discountPercentage=parseInt(req.body.discountPercentage);
          if(req.body.position) {
            req.body.position=parseInt(req.body.position);
          }
          else {
            const cout=await Product.countDocuments()+1;
            req.body.position=cout;
            // req.body.position=;
          }
          req.body.updateBy=res.locals.account.id;
          await Product.updateOne({
            _id:id,
            deleted:false
          },req.body);
          req.flash('success','update thanh cong');
          res.redirect(`${sytem.path.prefixAdmin}/product`);      
      } catch (error) {
        res.redirect(`${sytem.path.prefixAdmin}/product`);
      }
   }
   else {
      res.send('403');
   }
}



// [GET] /admin/product/detail
module.exports.detail=async (req,res) =>{
  try {
     const id=req.params.id;
     const product=await Product.findOne({
        _id:id
     });

    if(product.createBy) {
       const accCreate= await accountsDtb.findOne({
        _id: product.createBy
       })
       const permissions= await roleDtb.findOne({
         _id:accCreate.role_id
       });
       product.createAtForMat=moment(product.createdAt).format('DD-MM-YYYY');
       product.permissionsCreate=permissions.title;
       product.createByFullName=accCreate.fullName;
    }

    if(product.updateBy) {
       const accUpdate= await accountsDtb.findOne({
        _id: product.updateBy
       })

       const permissionsUpdate= await roleDtb.findOne({
         _id:accUpdate.role_id
       });
       product.updateAtForMat=moment(product.updatedAt).format('DD-MM-YYYY');
       product.permissionsUpdate=permissionsUpdate.title;
       product.updateByFullName=accUpdate.fullName;
    }
    
   
    if(product) {
      res.render('admin/page/products/detail.pug',{
        pageTitle: 'Chi tiết sản phẩm',
        product: product
      }) 
    }
    else {
      res.redirect(`${sytem.path.prefixAdmin}/product`);
    }
  } catch (error) {
    res.redirect(`${sytem.path.prefixAdmin}/product`);
  }
}












  











  // thungrac
  module.exports.trash= async(req,res)=> {
    const find= {
      deleted: true
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

    const pagination = await paginationHelpers(req,find);

    //end phan trang  await Prodcut
    

    const products= await Product
      .find(find)   // him tim kiem
      .limit(pagination.limitItem)     // gioi han bao nhieu ban ghi
      .skip(pagination.skip);  // tim  tu trang bao nhieu
    
    // console.log(products);
    for (const item of products) {
        if(item.deletedBy) {
            const accDelete= await accountsDtb.findOne({
              _id: item.deletedBy
            });
            item.nameDelete=accDelete.fullName;
        }
        item.deleteAt=moment(item.updateAt).format('DD-MM-YY');
    }

    res.render('admin/page/products/trash.pug', {
      pageTitle: "Trash",
      products: products,
      keyword: keyword,
      filterStatus:filterStatus,
      pagination: pagination
    });
  }

  // khoi phuc san pham
  module.exports.back= async (req,res) => {
    const id=req.params.id;
    // console.log(id);
    await Product.updateOne({
      _id: id
    },{
      deleted: false
    })
    req.flash('success','Khôi phục thành công!')
    res.json( {  //chuyen js sang json
        code:200
    });
}
// end khoi phuc

//xoa vinh vien 1 san pham
   
  module.exports.deleteVv= async(req,res) =>{
    const id=req.params.id;
    await Product.deleteOne({
      _id: id
    }
   )
    res.json( {
      code:200
    })
  }

//end xoa vinh vien 1 san pham