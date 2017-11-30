const sskts = require('@motionpicture/sskts-domain');
const express = require('express');
const router = express.Router();
const debug = require('debug')('sskts-console:router:index');
const io = require('../io');

io.on('connection', (socket) => {
    // 劇場組織検索
    socket.on('searching-movieTheaters', async (data) => {
        const repo = new sskts.repository.Organization(sskts.mongoose.connection);
        const movieTheaters = await repo.searchMovieTheaters({});
        socket.emit('movieTheaters-found', movieTheaters);
    });

    // 注文検索
    socket.on('searching-orders', async (conditions) => {
        const repo = new sskts.repository.Order(sskts.mongoose.connection);
        const orders = await repo.orderModel.find({
            'seller.id': conditions.sellerId,
            'confirmationNumber': conditions.confirmationNumber
        }).limit(10).exec().then((docs) => docs.map((doc) => doc.toObject()));
        debug('orders found.', orders.length);
        socket.emit('orders-found', orders);
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
