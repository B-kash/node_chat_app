let socket = io();
//    console.log(socket);
socket.on('connect',()=>{
    console.log("Connected to server");

});
socket.on('disconnect',()=>{
    console.log("Server is down,disconnected");
});
socket.on('newMessage',(data)=>{
    console.log(" got new Message",data);
});
function emitMessage(data) {
    socket.emit('createMessage',data);
}