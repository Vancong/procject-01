const mongoose=require('mongoose');
const slug=require('mongoose-slug-updater');
mongoose.plugin(slug);
 
const productSchema= new mongoose.Schema (
    {
        title: String,
        description:String,
        price: Number,
        discountPercentage:Number,
        stock: Number,
        thumbnail: String,
        status:String,
        position:Number,
        deleted:{
            type: Boolean,
            default: false
        },
        slug: {
            type: String,
            slug: "title",
            unique: true
        }   
    },{
     timestamps: true // tu dong them truong createAt va updateAt
    }
)

const productDtb=mongoose.model(
    'products',
     productSchema,   
    "products"
);

module.exports=productDtb;