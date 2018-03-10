import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import * as io from 'socket.io-client';

import { MovieTheaterComponent } from './modal/movieTheater.component';

type IMovieTheater = ssktsFactory.place.movieTheater.IPlace;
type IOrder = ssktsFactory.order.IOrder;

@Component({
    selector: 'sskts-search-movie-theater-detail',
    templateUrl: './movieTheater-detail.component.html',
})
export class MovieTheaterDetailComponent implements OnInit, OnDestroy {
    identifier: string;
    sub: any;
    socket = io();
    movieTheater: IMovieTheater;

    constructor(
        private route: ActivatedRoute,
        private modalService: NgbModal,
    ) {
        // 劇場照会結果
        this.socket.on('movieTheaterPlace-found', (movieTheater: IMovieTheater) => {
            this.movieTheater = movieTheater;
            this.showEventModal();
        });
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.identifier = params['identifier'];

            // 劇場照会
            this.socket.emit('finding-movieTheater-by-branchCode', this.identifier);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    showEventModal() {
        const activeModal = this.modalService.open(MovieTheaterComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = `劇場 ${this.movieTheater.identifier}`;
        activeModal.componentInstance.movieTheater = this.movieTheater;
    }
}
