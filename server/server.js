const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const {isRealString} = require('./utils/validation')

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("new USer Connected");



    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room) ){
            callback && callback('name and room name are required');

        }
        socket.join(params.room);
        emitMessage(socket,'newMessage',generateMessage('Admin','Welcome to the chat app'));

        broadcastMessage(socket,'newMessage',generateMessage('Admin',params.name+' joined'),params.room);
        callback && callback();
    });

    socket.on('disconnect',()=>{
        console.log("Client disconnected");
    });

    socket.on('createMessage',(data,callbackFunc)=>{
        broadcastMessage(socket,'newMessage',generateMessage(data.from,data.text));
        callbackFunc && callbackFunc(generateMessage(data.from,data.text));
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    })
});

function emitMessage(socket,event,data){
    // console.log("NOw emiiting data",data);
    socket.emit(event,data);
}
function broadcastMessage(socket,event,data,room) {
    // console.log("NOw emiiting data",data);
    // io.emit(event,data);
    if(room){
        socket.broadcast.to(room).emit(event,data);
    }else{
        socket.broadcast.emit(event,data);
    }
}



server.listen(port, () => {
    console.log("App is running on port ", port);
});
