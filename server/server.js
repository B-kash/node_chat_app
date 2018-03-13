const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("new USer Connected");

    emitMessage(socket,'newMessage',{
        from:'Admin',
        text:'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    broadcastMessage(socket,'newMessage',{
        from:'Admin',
        text:'New User joined',
        createdAt: new Date().getTime()
    });

    socket.on('disconnect',()=>{
        console.log("Client disconnected");
    });

    socket.on('createMessage',(data)=>{
        console.log("some guy sent this message",data);
        broadcastMessage(socket,'newMessage',data);

    })
});

function emitMessage(socket,event,data){
    console.log("NOw emiiting data",data);
    data.createdAt = new Date().getTime();
    socket.emit(event,data);
}
function broadcastMessage(socket,event,data) {
    console.log("NOw emiiting data",data);
    data.createdAt = new Date().getTime();
    // io.emit('newMessage',data);
    socket.broadcast.emit(event,data);
}



server.listen(port, () => {
    console.log("App is running on port ", port);
});