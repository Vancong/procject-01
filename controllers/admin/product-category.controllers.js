const Productcategory=require('../../models/product-category.models.js');
const sytem=require('../../config/sytem.js')
const createTree=require('../../helpers/create-tree.helpers.js')
module.exports.index= async(req,res) =>{
    const records= await Productcategory.find({
        deleted:false
    })
    res.render("admin/page/product-category/index.pug",{
        pageTitle: "Danh mục sản phẩm",
        records: records
    });
}

module.exports.create=async(req,res) =>{
    const categories=await Productcategory.find({
        deleted: false
    })
    

    const newCategories=createTree(categories);
    console.log(newCategories);
    res.render("admin/page/product-category/create.pug",{
        pageTitle:"Thêm mới danh mục sản phẩm",
        categories: newCategories
    });
}

module.exports.createPost=async(req,res)=>{
   
    if(req.body.position) {
      req.body.position=parseInt(req.body.position);
    }
    else {
      const cout=await Productcategory.countDocuments()+1;
      req.body.position=cout;
      // req.body.position=;
    }
    const newProduct=new Productcategory(req.body);
    await newProduct.save();
    res.redirect(`${sytem.path.prefixAdmin}/product-category`);
}

module.exports.edit=async (req,res) =>{
    try {
        const id=req.params.id;
        const categories=await Productcategory.find({
            deleted: false
        })
        const newCategories=createTree(categories);
        const category= await Productcategory.findOne({
            _id:id
        })
        if(category) {
            res.render('admin/page/product-category/edit.pug',{
                pageTitle:'Chỉnh sửa danh mục sản phẩm',
                category: category,
                categories: newCategories
            });
        }
    } catch (error) {
        res.redirect(`${sytem.path.prefixAdmin}/product-category`);
    }
}

module.exports.editPatch=async(req,res) =>{
    try {
            // console.log(req.body);
        const id=req.params.id;
        // console.log(id);
        if(req.body.position) {
            req.body.position=parseInt(req.body.position);
        }
        await Productcategory.updateOne({
            _id:id,
            deleted:false
        },
            req.body
        )
        req.flash('success','cap nhat thanh cong');
        res.redirect(`${sytem.path.prefixAdmin}/product-category`);
    } catch (error) {
        res.redirect(`${sytem.path.prefixAdmin}/product-category`);
    }
}
