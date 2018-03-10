import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import * as moment from 'moment';
import * as io from 'socket.io-client';

import { ScreeningRoomComponent } from './screeningRoom.component';

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
    selector: 'sskts-search-movie-theater-modal',
    templateUrl: './movieTheater.component.html',
    styleUrls: ['./movieTheater.component.scss'],
})
export class MovieTheaterComponent implements OnInit, OnDestroy {
    modalHeader: string;

    socket = io();
    movieTheater: IMovieTheater;
    screeningRoom: IScreeningRoom;
    screeningRooms: IScreeningRoom[];
    reservationStartDate: Date;
    reservationEndDate: Date;
    transactions: ITransaction[] = [];
    datas: any[];

    config: NbJSThemeOptions;
    datasets: IDataset[];
    data: {};
    options: any;
    themeSubscription: any;

    constructor(
        private activeModal: NgbActiveModal,
        private route: ActivatedRoute,
        private theme: NbThemeService,
        private modalService: NgbModal,
    ) {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            this.config = config;
        });

        // 劇場場所照会結果
        this.socket.on('movieTheaterPlace-found', (movieTheater: IMovieTheater) => {
            this.movieTheater = movieTheater;
        });
    }

    ngOnInit() {
        this.screeningRooms = this.movieTheater.containsPlace;
    }

    ngOnDestroy() {
        // this.sub.unsubscribe();
        // this.themeSubscription.unsubscribe();
    }

    closeModal() {
        this.activeModal.close();
    }

    onSelectScreeningRoom(screeningRoom: IScreeningRoom): void {
        this.screeningRoom = screeningRoom;
        this.showScreeningRoomModal();
    }

    showScreeningRoomModal() {
        const activeModal = this.modalService.open(ScreeningRoomComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = `上映ルーム ${this.screeningRoom.branchCode}`;
        activeModal.componentInstance.movieTheater = this.movieTheater;
        activeModal.componentInstance.screeningRoom = this.screeningRoom;
    }
}
