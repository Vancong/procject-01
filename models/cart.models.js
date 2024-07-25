const mongoose=require('mongoose');
const cartSchema= new mongoose.Schema (
    {
       products: [
        {
           productId: String,
           quantity: Number,
           isSelected:{
                type: Boolean,
                default:false
           }
        }
       ],
      
    },{
     timestamps: true // tu dong them truong createAt va updateAt
    }
)

const cartDtb=mongoose.model(
    'cart',
     cartSchema,   
    "cart"
);

module.exports=cartDtb;