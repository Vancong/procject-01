var socket = io();

const formChat=document.querySelector('.chat .inner-form');
if(formChat){
    formChat.addEventListener("submit", (event) =>{
        event.preventDefault();
        const content=event.target.content.value;
        if(content) {
            console.log(content);
            socket.emit("CLIENT_SEND_MESSAGE",{
                content:content,
            
            });
            event.target.content.value="";
        }
    })
}