const chatDtb=require('../../models/chat.models');
module.exports.index=async(req,res) =>{

    io.on('connection', (socket) => {    
        socket.on("CLIENT_SEND_MESSAGE",(data) =>{
            const chat={
                userId: user.id,
                content: data.content
            }

            const newChat= new chatDtb(chat);
            newChat.save();
        })
    });

    const chat=await chatDtb.find({});
      
    res.render('client/pages/chat/index.pug',{
        pageTitle:'Chat',
        chat: chat
    })
}