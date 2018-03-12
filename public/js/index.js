let socket = io();
//    console.log(socket);
socket.on('connect',()=>{
    console.log("Connected to server");
    socket.emit('createMessage',{
        to:'test@test.com',
        text:'Hey nigga'

    });
});
socket.on('disconnect',()=>{
    console.log("Server is down,disconnected");
});
socket.on('newMessage',(data)=>{
    console.log(" got new Message",data);
});
