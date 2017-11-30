const sskts = require('@motionpicture/sskts-domain');
const express = require('express');
const router = express.Router();
const debug = require('debug')('sskts-console:router:index');
const io = require('../io');

io.on('connection', (socket) => {
    // 劇場組織検索
    socket.on('search-movieTheaters', async (data) => {
        console.log(data);
        const repo = new sskts.repository.Organization(sskts.mongoose.connection);
        const movieTheaters = await repo.searchMovieTheaters({});
        socket.emit('searched-movieTheaters', movieTheaters);
    });
    // socket.on('save-message', async function (data) {
    //     console.log(data);

    //     const chats = await Chat.find().exec();
    //     console.log('chats:', chats.length);
    //     // only to a sender
    //     socket.emit('new-message', { message: data });
    //     // io.emit('new-message', { message: data });
    // });
});

/* GET home page. */
// router.get('*', function (req, res, next) {
//     res.render('index.html');
// });

module.exports = router;
