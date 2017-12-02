import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    selector: 'sskts-search-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit, OnDestroy {
    identifier: string;
    private sub: any;

    socket = io();
    movieTheater: IMovieTheater;
    screeningRoom: IScreeningRoom;
    event: IEvent;
    transactions: ITransaction[];
    datas: any[];

    config: NbJSThemeOptions;
    datasets: IDataset[];
    data: {};
    options: any;
    themeSubscription: any;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private theme: NbThemeService,
    ) {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            this.config = config;

            this.event = null;
            this.transactions = [];
            this.datas = [];

            // チャート初期化
            this.initalizeChart();
        });

        // 劇場場所照会結果
        this.socket.on('movieTheaterPlace-found', (movieTheater: IMovieTheater) => {
            this.movieTheater = movieTheater;
            this.screeningRoom = <any>movieTheater.containsPlace.find((place) => place.branchCode === this.event.location.branchCode);
        });

        // イベント照会結果
        this.socket.on('event-found', (event: IEvent) => {
            this.event = event;

            // 劇場場所照会
            this.socket.emit('finding-movieTheater-by-branchCode', this.event.superEvent.location.branchCode);

            // イベントに対する取引検索
            this.socket.emit('searching-transactions-by-event', this.event.identifier);
        });

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

            const screenRoom = this.movieTheater.containsPlace.find((place) => place.branchCode === this.event.location.branchCode);
            let numberOfSeats = screenRoom.containsPlace[0].containsPlace.length;
            const firstSeatReservationAuthorizeDate = this.datas[0].seatReservationAuthorizeAction.endDate;
            this.datasets[0].data = this.datas.reduce(
                (a, b) => {
                    numberOfSeats -= b.seatReservationAuthorizeAction.seatNumbers.length;
                    // 最初の座席仮予約からの時間
                    const diff = moment(b.seatReservationAuthorizeAction.endDate)
                        .diff(moment(firstSeatReservationAuthorizeDate), 'minutes');
                    a.push({
                        x: diff,
                        y: numberOfSeats,
                    });

                    return a;
                },
                [],
            );

            this.updateChart();
        });
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.identifier = params['identifier'];

            // イベント照会
            this.socket.emit('finding-event', this.identifier);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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
                            // beginAtZero: true,
                        },
                    },
                ],
            },
        };
    }

    private updateChart() {
        const colors: any = this.config.variables;

        this.data = {
            // labels: this.labels,
            datasets: this.datasets.map((dataset) => {
                return {
                    label: dataset.scope,
                    data: dataset.data,
                    borderColor: dataset.color,
                    backgroundColor: dataset.color,
                    fill: false,
                    borderDash: [0, 0],
                    pointRadius: 8,
                    pointHoverRadius: 10,
                };
            }),
        };
    }
}
