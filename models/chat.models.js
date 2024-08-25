const mongoose=require('mongoose');

const chatSchema= new mongoose.Schema (
    {
      
        userId: String,
        // roomChatId: String,
        content: String,
        image:Array 
         
    },{
     timestamps: true // tu dong them truong createAt va updateAt
    }
)

const chatDtb=mongoose.model(
    'chat',
     chatSchema,   
    "chat"
);

module.exports=chatDtb;