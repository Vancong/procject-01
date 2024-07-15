const mongoose=require('mongoose');
const roleSchema= new mongoose.Schema (
    {
        title: String,
        description:String,
        permissions:{
            type: Array,
            default: []
        },
        deleted:{
            type: Boolean,
            default: false
        },
    },{
     timestamps: true // tu dong them truong createAt va updateAt
    }
)

const roleDtb=mongoose.model(
    'roles',
     roleSchema,   
    "roles"
);

module.exports=roleDtb;