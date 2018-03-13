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

jQuery('#message-form').on('submit',function(e){
   e.preventDefault();
   emitMessage('createMessage',{
       from:'User',
       text: jQuery('[name=message]').val()
   });
});