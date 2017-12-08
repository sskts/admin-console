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
    selector: 'sskts-search-transaction-modal',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, OnDestroy {
    modalHeader: string;

    socket = io();
    movieTheater: IMovieTheater;
    screeningRoom: IScreeningRoom;
    transaction: ITransaction;
    reservationStartDate: Date;
    reservationEndDate: Date;
    transactions: ITransaction[] = [];
    datas: any[];

    config: NbJSThemeOptions;
    datasets: IDataset[];
    data: {};
    options: any;
    themeSubscription: any;

    report: any;

    constructor(
        private activeModal: NgbActiveModal,
        private route: ActivatedRoute,
        private theme: NbThemeService,
    ) {
        // this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        //     this.config = config;
        // });

        // 劇場場所照会結果
        this.socket.on('transaction-report-created', (report: any) => {
            console.log(report);
            this.report = report;
        });
    }

    ngOnInit() {
        console.log('converting...', this.transaction);
        // this.socket.emit('coverting-transaction-to-report', this.transaction);
    }

    ngOnDestroy() {
        // this.sub.unsubscribe();
        // this.themeSubscription.unsubscribe();
    }

    closeModal() {
        this.activeModal.close();
    }
}
