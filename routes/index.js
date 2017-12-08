const sskts = require('@motionpicture/sskts-domain');
const express = require('express');
const router = express.Router();
const debug = require('debug')('sskts-console:router:index');
const io = require('../io');

io.on('connection', (socket) => {
    // 劇場組織作成(ショップオープン)
    socket.on('creating-movieTheater', async (data) => {
        const organizationRepo = new sskts.repository.Organization(sskts.mongoose.connection);
        const movieTheater = sskts.factory.organization.movieTheater.create({
            name: {
                en: data.nameEn,
                ja: data.nameJa
            },
            branchCode: data.locationBranchCode,
            gmoInfo: {
                shopPass: data.shopPass,
                shopId: data.shopId,
                siteId: process.env.GMO_SITE_ID
            },
            parentOrganization: {
                typeOf: sskts.factory.organizationType.Corporation,
                identifier: sskts.factory.organizationIdentifier.corporation.SasakiKogyo,
                name: {
                    en: 'Cinema Sunshine Co., Ltd.',
                    ja: '佐々木興業株式会社'
                }
            },
            location: {
                typeOf: 'MovieTheater',
                branchCode: data.locationBranchCode,
                name: {
                    en: data.nameEn,
                    ja: data.nameJa
                }
            },
            // tslint:disable-next-line:no-http-string
            url: data.url
        });
        debug('creating movieTheater...', movieTheater);
        await organizationRepo.openMovieTheaterShop(movieTheater);
        socket.emit('movieTheater-created', movieTheater);
    });

    // 劇場組織削除
    socket.on('deleting-movieTheater', async (data) => {
        try {
            const organizationRepo = new sskts.repository.Organization(sskts.mongoose.connection);
            debug('deleting movieTheater...', data);
            await organizationRepo.organizationModel.findByIdAndRemove(data).exec();
            socket.emit('movieTheater-deleted', data);
        } catch (error) {
            debug(error);
        }
    });

    // 劇場組織検索
    socket.on('searching-movieTheaters', async (data) => {
        const repo = new sskts.repository.Organization(sskts.mongoose.connection);
        const movieTheaters = await repo.searchMovieTheaters({});
        socket.emit('movieTheaters-found', movieTheaters);
    });

    // 劇場場所検索
    socket.on('searching-movieTheaterPlaces', async (data) => {
        const repo = new sskts.repository.Place(sskts.mongoose.connection);
        const movieTheaters = await repo.searchMovieTheaters({});
        socket.emit('movieTheaterPlaces-found', movieTheaters);
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

    // 上映イベント検索
    socket.on('searching-events', async (conditions) => {
        debug(conditions);
        const repo = new sskts.repository.Event(sskts.mongoose.connection);
        const events = await repo.searchIndividualScreeningEvents(conditions);
        debug('events found.', events.length);
        socket.emit('events-found', events);
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
