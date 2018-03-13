const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("new USer Connected");

    emitMessage(socket,'newMessage',generateMessage('Admin','Welcome to the chat app'));

    broadcastMessage(socket,'newMessage',generateMessage('Admin','New User joined'));

    socket.on('disconnect',()=>{
        console.log("Client disconnected");
    });

    socket.on('createMessage',(data,callbackFunc)=>{
        console.log("some guy sent this message",data);
        broadcastMessage(socket,'newMessage',generateMessage(data.from,data.text));
        callbackFunc && callbackFunc(generateMessage(data.from,data.text));
    })
});

function emitMessage(socket,event,data){
    console.log("NOw emiiting data",data);
    socket.emit(event,data);
}
function broadcastMessage(socket,event,data) {
    console.log("NOw emiiting data",data);
    // io.emit(event,data);
    socket.broadcast.emit(event,data);
}



server.listen(port, () => {
    console.log("App is running on port ", port);
});