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
socket.on('newLocationMessage',(message) => {
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}:`);
    a.attr('href',message.ulr);
    li.append(a);
    jQuery('#messages').append(li);

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
        socket.emit('createLocationMessage',{
            latitude:pos.coords.latitude,
            longitude:pos.coords.longitude
        });
    },(function (){
        alert("unable to fetch location");
    }))
}


