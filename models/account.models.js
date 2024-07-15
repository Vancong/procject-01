const mongoose=require('mongoose');

const accountsSchema= new mongoose.Schema (
    {
        fullName: String,
        email:String,
        password:String,
        phone:String,
        token: String,
        avatar: String,
        status:String,
        role_id: String,
        deleted:{
            type: Boolean,
            default: false
        }
         
    },{
     timestamps: true // tu dong them truong createAt va updateAt
    }
)

const accountsDtb=mongoose.model(
    'accounts',
     accountsSchema,   
    "accounts"
);

module.exports=accountsDtb;