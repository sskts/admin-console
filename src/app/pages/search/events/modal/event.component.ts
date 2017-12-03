import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import * as moment from 'moment';
import * as io from 'socket.io-client';

type IMovieTheater = ssktsFactory.place.movieTheater.IPlace;
type IScreeningRoom = ssktsFactory.place.movieTheater.IScreeningRoom;
type IEvent = ssktsFactory.event.individualScreeningEvent.IEvent;
type ITransaction = ssktsFactory.transaction.placeOrder.ITransaction;

/**
 * チャートの各LINEのデータセットインターフェース
 */
interface IDataset {
    scope: string;
    data: {
        x: Date;
        y: number;
    }[];
    color: string;
}

@Component({
    selector: 'sskts-search-event-modal',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit, OnDestroy {
    modalHeader: string;

    socket = io();
    movieTheater: IMovieTheater;
    screeningRoom: IScreeningRoom;
    event: IEvent;
    reservationStartDate: Date;
    reservationEndDate: Date;
    transactions: ITransaction[] = [];
    datas: any[] = [];

    config: NbJSThemeOptions;
    datasets: IDataset[];
    data: {};
    options: any;
    themeSubscription: any;

    constructor(
        private activeModal: NgbActiveModal,
        private route: ActivatedRoute,
        private theme: NbThemeService,
    ) {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            this.config = config;

            // チャート初期化
            this.initalizeChart();
        });

        // 劇場場所照会結果
        this.socket.on('movieTheaterPlace-found', (movieTheater: IMovieTheater) => {
            this.movieTheater = movieTheater;
            this.screeningRoom = <any>movieTheater.containsPlace.find((place) => place.branchCode === this.event.location.branchCode);

            // イベントに対する取引検索
            this.socket.emit('searching-transactions-by-event', this.event.identifier);
        });

        // イベント照会結果
        // this.socket.on('event-found', (event: IEvent) => {
        //     this.event = event;

        //     // 劇場場所照会
        //     this.socket.emit('finding-movieTheater-by-branchCode', this.event.superEvent.location.branchCode);

        //     // イベントに対する取引検索
        //     this.socket.emit('searching-transactions-by-event', this.event.identifier);
        // });

        // 取引検索結果
        this.socket.on('transactions-by-event-found', (transactions: ITransaction[]) => {
            this.transactions = transactions;
            this.datas = this.transactions.map((transaction) => {
                const seatReservationAuthorizeAction = transaction.object.authorizeActions.find(
                    (action) => action.purpose.typeOf === 'SeatReservation',
                );
                return {
                    id: transaction.id,
                    startDate: transaction.startDate,
                    endDate: transaction.endDate,
                    seatReservationAuthorizeAction: {
                        seatNumbers: seatReservationAuthorizeAction.object.offers.map((offer) => offer.seatNumber),
                        endDate: new Date(seatReservationAuthorizeAction.endDate),
                    },
                };
            });

            let numberOfSeats = this.screeningRoom.containsPlace[0].containsPlace.length;

            this.datasets[0].data = this.datas.reduce(
                (a, b) => {
                    numberOfSeats -= b.seatReservationAuthorizeAction.seatNumbers.length;
                    // 最初の座席仮予約からの時間
                    const diff = moment(b.seatReservationAuthorizeAction.endDate)
                        .diff(moment(this.reservationStartDate), 'minutes');
                    a.push({
                        x: diff,
                        y: numberOfSeats,
                    });

                    return a;
                },
                [{ x: 0, y: numberOfSeats }],
            );

            this.updateChart();
        });
    }

    ngOnInit() {
        // 売り出し日時は？
        this.reservationStartDate = moment(`${this.event.coaInfo.rsvStartDate} 00:00:00+09:00`, 'YYYYMMDD HH:mm:ssZ').toDate();
        this.reservationEndDate = moment(`${this.event.coaInfo.rsvEndDate} 23:59:59+09:00`, 'YYYYMMDD HH:mm:ssZ').toDate();

        // 劇場場所照会
        this.socket.emit('finding-movieTheater-by-branchCode', this.event.superEvent.location.branchCode);
    }

    ngOnDestroy() {
        // this.sub.unsubscribe();
        // this.themeSubscription.unsubscribe();
    }

    private initalizeChart() {
        const colors: any = this.config.variables;
        const chartjs: any = this.config.variables.chartjs;

        const colorChoices = [
            colors.primary,
            colors.success,
            colors.info,
            colors.warning,
            colors.danger,
        ];

        this.data = {};

        this.datasets = [{
            scope: 'seatReservationAuthorizeAction',
            data: [],
            color: colorChoices[0],
        }];
    }

    private updateChart() {
        const colors: any = this.config.variables;
        const chartjs: any = this.config.variables.chartjs;

        const reservationPeriodInMinutes = moment(this.reservationEndDate).diff(moment(this.reservationStartDate), 'minutes');
        const labels = [];
        for (let i = 0; i < Math.floor(reservationPeriodInMinutes / 60) + 1; i++) {
            labels.push(i * 60);
        }

        this.options = {
            // elements: {
            //     line: {
            //         tension: 0, // disables bezier curves
            //     },
            // },
            animation: {
                duration: 0,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'bottom',
                labels: {
                    fontColor: chartjs.textColor,
                },
            },
            hover: {
                mode: 'index',
            },
            scales: {
                xAxes: [
                    {
                        type: 'linear',
                        position: 'bottom',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: '経過時間',
                        },
                        gridLines: {
                            display: true,
                            color: chartjs.axisLineColor,
                        },
                        ticks: {
                            fontColor: chartjs.textColor,
                            beginAtZero: true,
                            min: 0,
                            max: reservationPeriodInMinutes,
                            // stepSize: 100,
                        },
                    },
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: '残席数',
                        },
                        gridLines: {
                            display: true,
                            color: chartjs.axisLineColor,
                        },
                        ticks: {
                            fontColor: chartjs.textColor,
                            beginAtZero: true,
                            min: 0,
                        },
                    },
                ],
            },
        };

        this.data = {
            // labels: labels,
            datasets: this.datasets.map((dataset) => {
                return {
                    label: dataset.scope,
                    data: dataset.data,
                    borderColor: dataset.color,
                    backgroundColor: dataset.color,
                    fill: false,
                    borderDash: [0, 0],
                    pointRadius: 4,
                    pointHoverRadius: 5,
                };
            }),
        };
    }

    closeModal() {
        this.activeModal.close();
    }
}
