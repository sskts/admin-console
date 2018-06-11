/**
 * socket.io
 * @module
 */

const sio = require('socket.io');

const io = sio();
io.on('connection', (socket) => {
    console.log('User connected to soclet.io.');
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
});

module.exports = io;
