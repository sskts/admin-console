import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import * as moment from 'moment';
import * as io from 'socket.io-client';

type IMovieTheater = ssktsFactory.place.movieTheater.IPlace;
type IScreeningRoom = ssktsFactory.place.movieTheater.IScreeningRoom;

@Component({
    selector: 'sskts-search-screening-room-modal',
    templateUrl: './screeningRoom.component.html',
    styleUrls: ['./screeningRoom.component.scss'],
})
export class ScreeningRoomComponent implements OnInit, OnDestroy {
    modalHeader: string;

    socket = io();
    movieTheater: IMovieTheater;
    screeningRoom: IScreeningRoom;
    aggregations: any[];

    config: NbJSThemeOptions;
    themeSubscription: any;

    constructor(
        private activeModal: NgbActiveModal,
        private route: ActivatedRoute,
        private theme: NbThemeService,
    ) {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            this.config = config;
        });

        this.socket.on('aggregated', (aggregations: any[]) => {
            console.log(aggregations);
            this.aggregations = aggregations;
        });
    }

    ngOnInit() {
        // this.screeningRooms = this.movieTheater.containsPlace;

        // スクリーンの座席スコア集計
        this.socket.emit('aggregating-seatReservationOfferAvailableRate', this.movieTheater.branchCode, this.screeningRoom.branchCode);
    }

    ngOnDestroy() {
        // this.sub.unsubscribe();
        // this.themeSubscription.unsubscribe();
    }

    closeModal() {
        this.activeModal.close();
    }
}
