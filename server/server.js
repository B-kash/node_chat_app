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
    socket.on('disconnect',()=>{
        console.log("Client disconnected");
    });

    socket.on('createMessage',(data)=>{
        console.log("some guy sent this message",data);
        broadcastMessage(socket,data);

    })
});

function emitMessage(socket,data){
    console.log("NOw emiiting data",data);
    data.createdAt = new Date().getTime();
    socket.emit('newMessage',data);
}
function broadcastMessage(data) {
    console.log("NOw emiiting data",data);
    data.createdAt = new Date().getTime();
    io.emit('newMessage',data);
}



server.listen(port, () => {
    console.log("App is running on port ", port);
});