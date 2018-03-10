const sskts = require('@motionpicture/sskts-domain');
const express = require('express');
const moment = require('moment');
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

    // 取引検索
    socket.on('searching-placeOrderTransactions', async (conditions) => {
        debug(conditions);
        const repo = new sskts.repository.Transaction(sskts.mongoose.connection);
        const transactions = await repo.transactionModel.find({
            typeOf: sskts.factory.transactionType.PlaceOrder,
            'result.order.orderInquiryKey.confirmationNumber': parseInt(conditions.confirmationNumber, 10),
            'result.order.orderInquiryKey.theaterCode': { $in: conditions.sellerBranchCodes }
        }).sort('endDate').exec().then((docs) => docs.map((doc) => doc.toObject()));
        debug('transactions found.', transactions);
        socket.emit('placeOrderTransactions-found', transactions);
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

    // 取引→レポート
    socket.on('coverting-transaction-to-report', async (transaction) => {
        try {
            debug('converting...', transaction);
            const report = sskts.service.transaction.placeOrder.transaction2report(transaction);
            debug('report:', report);
            socket.emit('transaction-report-created', report);
        } catch (error) {
            debug(error);
        }
    });

    // スクリーンの座席スコア集計
    socket.on('aggregating-seatReservationOfferAvailableRate', async (movieTheaterBranchCode, screeningRoomBranchCode) => {
        try {
            debug('aggregating...', movieTheaterBranchCode, screeningRoomBranchCode);
            // ここ1ヵ月の座席に対する上映イベントリストを取得
            const placeRepo = new sskts.repository.Place(sskts.mongoose.connection);
            const eventRepo = new sskts.repository.Event(sskts.mongoose.connection);
            const orderRepo = new sskts.repository.Order(sskts.mongoose.connection);

            const movieTheater = await placeRepo.findMovieTheaterByBranchCode(movieTheaterBranchCode);
            const screeningRoom = movieTheater.containsPlace.find((p) => p.branchCode === screeningRoomBranchCode);
            if (screeningRoom === undefined) {
                throw new Error('screeningRoom not found.');
            }
            const screeningRoomSections = screeningRoom.containsPlace;
            if (screeningRoomSections === undefined) {
                throw new Error('screeningRoomSection not found.');
            }
            const screeningRoomSection = screeningRoomSections[0];
            const seats = screeningRoomSection.containsPlace;
            if (seats === undefined) {
                throw new Error('seats not found.');
            }

            let events = await eventRepo.eventModel.find(
                {
                    typeOf: sskts.factory.eventType.IndividualScreeningEvent,
                    // tslint:disable-next-line:no-magic-numbers
                    startDate: { $gte: moment().add(-1, 'months').toDate() },
                    'location.branchCode': screeningRoomBranchCode,
                    'superEvent.location.branchCode': movieTheaterBranchCode
                },
                'identifier name startDate coaInfo.rsvStartDate'
            ).exec().then((docs) => docs
                .map((doc) => doc.toObject())
                .map((e) => {
                    return {
                        identifier: e.identifier,
                        startDate: e.startDate,
                        reserveStartDate: moment(`${e.coaInfo.rsvStartDate} 00:00:00+09:00`, 'YYYYMMDD HH:mm:ssZ').toDate(),
                        firstOrderDate: null
                    };
                }));
            debug(events.length, 'events found.');

            // イベントに対する注文を取得
            const orders = await orderRepo.orderModel.find(
                { 'acceptedOffers.itemOffered.reservationFor.identifier': { $in: events.map((e) => e.identifier) } },
                'acceptedOffers orderDate'
            ).exec().then((docs) => docs.map((doc) => doc.toObject()));
            debug(orders.length, 'orders found.');

            // 最初の注文をイベントごとに取り出す
            events = events.map((e) => {
                const ordersOnEvent = orders
                    .filter((o) => o.acceptedOffers[0].itemOffered.reservationFor.identifier === e.identifier)
                    .sort((a, b) => (a.orderDate < b.orderDate) ? -1 : 1);

                return {
                    ...e,
                    firstOrderDate: (ordersOnEvent.length > 0) ? ordersOnEvent[0].orderDate : null
                };
            });

            // 注文がないイベントは集計から除外
            events = events.filter((e) => e.firstOrderDate !== null);

            const aggregations = seats.map((seat) => {
                // 各上映イベントにおける、注文日時、予約開始日時、上映開始日時と比較する
                // 供給時間sum
                const offeredHours = events.reduce(
                    (a, b) => a + moment(b.startDate).diff(moment(b.firstOrderDate), 'hours'),
                    0
                );

                // 空席時間sum
                const availableHours = events.reduce(
                    (a, b) => {
                        const order = orders.find((o) => {
                            return o.acceptedOffers[0].itemOffered.reservationFor.identifier === b.identifier
                                && o.acceptedOffers[0].itemOffered.reservedTicket.ticketedSeat.seatNumber === seat.branchCode;
                        });
                        if (order === undefined) {
                            return a + moment(b.startDate).diff(moment(b.firstOrderDate), 'hours');
                        } else {
                            // 注文が入っていれば、最初の予約から自分の予約までの時間
                            return a + moment(order.orderDate).diff(moment(b.firstOrderDate), 'hours');
                        }
                    },
                    0
                );

                return {
                    seatNumber: seat.branchCode,
                    offeredHours: offeredHours,
                    availableHours: availableHours,
                    // tslint:disable-next-line:no-magic-numbers
                    availableRate: Math.floor(availableHours * 100 / offeredHours)
                };
            });
            debug(aggregations.length, 'aggregations emitting...');

            socket.emit('aggregated', aggregations);
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

router.get('/api/transactions/placeOrder', async (req, res, next) => {
    const transactionRepo = new sskts.repository.Transaction(sskts.mongoose.connection);
    const sellerBranchCodes = Array.isArray(req.query.sellerBranchCodes) ? req.query.sellerBranchCodes : [req.query.sellerBranchCodes];
    const searchConditions = {
        'result.order.orderInquiryKey.confirmationNumber': parseInt(req.query.confirmationNumber, 10),
        'result.order.orderInquiryKey.theaterCode': { $in: sellerBranchCodes }
    }

    const transactions = await transactionRepo.transactionModel.find(searchConditions).exec().then((docs) => docs.map((doc) => doc.toObject()));
    res.json(transactions);
});

router.get('/api/transactions/placeOrder/:id', async (req, res, next) => {
    const transactionRepo = new sskts.repository.Transaction(sskts.mongoose.connection);
    await transactionRepo.transactionModel.findOne({
        typeOf: sskts.factory.transactionType.PlaceOrder,
        _id: req.params.id
    }).exec()
        .then((doc) => {
            if (doc === null) {
                res.status(404).json(null);
            } else {
                res.json(doc.toObject());
            }
        });
});

/* GET home page. */
// router.get('*', function (req, res, next) {
//     res.render('index.html');
// });

module.exports = router;
