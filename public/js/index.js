let socket = io();
socket.on('connect', () => {
    //console.log("Connected to server");
    // emitMessage('createMessage',{
    //     from: "frank",
    //     text: 'Hello'
    // });
});
socket.on('disconnect', () => {
    //console.log("Server is down,disconnected");
});
socket.on('newMessage', (data) => {
    appendMessage(data);
});
function emitMessage(event,data) {
    socket.emit(event, data, function (res) {
        appendMessage(res);
    });
}

function appendMessage(data) {
    let li = jQuery('<li></li>');
    li.text(`${data.from}:${data.text}`);
    jQuery('#messages').append(li);
}

function send(e){
   e.preventDefault();
   emitMessage('createMessage',{
       from:'User',
       text: jQuery('[name=message]').val()
   });
}
function sendLocation(){
    // e.preventDefault();
    if(!navigator.geolocation){
        return alert('Geolocation not supported');
    }
    navigator.geolocation.getCurrentPosition(function(pos){
        console.log(pos);
    },(function (){
        alert("unable to fetch location");
    }))
}


