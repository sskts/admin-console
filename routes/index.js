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

    // イベント照会
    socket.on('finding-event', async (identifier) => {
        const repo = new sskts.repository.Event(sskts.mongoose.connection);
        try {
            const event = await repo.findIndividualScreeningEventByIdentifier(identifier);
            debug('event found.', event);
            socket.emit('event-found', event);
        } catch (error) {
            debug(error);
        }
    });

    // place照会
    socket.on('finding-movieTheater-by-branchCode', async (branchCode) => {
        const repo = new sskts.repository.Place(sskts.mongoose.connection);
        try {
            const place = await repo.findMovieTheaterByBranchCode(branchCode);
            debug('place found.', place);
            socket.emit('movieTheaterPlace-found', place);
        } catch (error) {
            debug(error);
        }
    });

    // イベントで取引検索
    socket.on('searching-transactions-by-event', async (eventIdentifier) => {
        const repo = new sskts.repository.Transaction(sskts.mongoose.connection);
        try {
            const transactions = await repo.transactionModel.find({
                typeOf: sskts.factory.transactionType.PlaceOrder,
                status: sskts.factory.transactionStatusType.Confirmed,
                'object.authorizeActions.object.individualScreeningEvent.identifier': eventIdentifier
            }).sort('endDate').exec().then((docs) => docs.map((doc) => doc.toObject()));
            debug('transactions found.', transactions.length);
            socket.emit('transactions-by-event-found', transactions);
        } catch (error) {
            debug(error);
        }
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
