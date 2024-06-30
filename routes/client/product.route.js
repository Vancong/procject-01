const express=require("express");
const router=express.Router();

const controllers=require("../../controllers/client/product.controllers.js");

router.get('/',controllers.index);
router.get('/:slug',controllers.detail);

module.exports=router;


// router.get('/create',controllers.create);



// router.post('/create',)


// router.patch('/edit',(req, res) => {
//     res.render('client/pages/product/edit.pug');
// })

// router.get('/detail',(req, res) => {
//     res.render('client/pages/product/detail.pug');
// })


