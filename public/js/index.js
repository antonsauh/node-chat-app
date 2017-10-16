var socket = io(); 

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});

socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

 // Jquery
$(function(){
    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: $('[name=message]').val()
        }, function () {
            $('[name=message]').val('');
        });
    });
var locationButton = $('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');
    }, function () {
        alert('Unable to fetch location!');
        locationButton.removeAttr('disabled').text('Send location');
    })
});

});

