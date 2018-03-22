let socket = io();
let messageTextBox = jQuery('[name=message]');
let locationButton = jQuery('[id=send-location]');
let template = jQuery('#message-template').html();
socket.on('connect', () => {
});
socket.on('disconnect', () => {
});
socket.on('newMessage', (data) => {
    appendMessage(data);
});
socket.on('newLocationMessage',(message) => {
    // let a = jQuery('<a target="_blank">My Current Location</a>');
    // a.attr('href',message.url);
    let a = '<a target="_blank" href="message.url">My Current Location</a>';
    appendMessage({
        from:message.from,
        text: a,
        createdAt: message.createdAt
    });

});
function emitMessage(event,data) {
    socket.emit(event, data, function (res) {
        messageTextBox.val('');
        appendMessage(res);
    });
}

function appendMessage(data) {
    // let li = jQuery('<li></li>');
    // let formattedTime = formatTime(data.createdAt);
    // li.text(`${data.from} ${formattedTime}:${data.text}`);
    // jQuery('#messages').append(li);
    let formattedTime = formatTime(data.createdAt);
    let html = Mustache.render(template,{
        text:data.text,
        formattedTime:formattedTime,
        from: data.from
    });
    jQuery('#messages').append(html);
}

function formatTime(timeStamp) {
    return moment(timeStamp).format('h:mm a');
}

function send(e){
   e.preventDefault();
   emitMessage('createMessage',{
       from:'User',
       text: messageTextBox.val()
   });
}
function sendLocation(){
    // e.preventDefault();
    if(!navigator.geolocation){
        return alert('Geolocation not supported');
    }
    locationButton.attr('disabled','disabled').text('Sending Location..');

    navigator.geolocation.getCurrentPosition(function(pos){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            latitude:pos.coords.latitude,
            longitude:pos.coords.longitude
        });
    },(function (){
        locationButton.removeAttr('disabled').text('Send Location');
        alert("unable to fetch location");
    }))
}


