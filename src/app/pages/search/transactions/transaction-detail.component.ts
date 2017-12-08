import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import * as io from 'socket.io-client';

import { TransactionComponent } from './modal/transaction.component';

type IEvent = ssktsFactory.event.individualScreeningEvent.IEvent;
type IMovieTheater = ssktsFactory.place.movieTheater.IPlace;
type IOrder = ssktsFactory.order.IOrder;

@Component({
    selector: 'sskts-search-transaction-detail',
    templateUrl: './transaction-detail.component.html',
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
    identifier: string;
    sub: any;
    socket = io();
    event: IEvent;

    constructor(
        private route: ActivatedRoute,
        private modalService: NgbModal,
    ) {
        // イベント照会結果
        this.socket.on('event-found', (event: IEvent) => {
            this.event = event;
            this.showEventModal();
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
    }

    showEventModal() {
        const activeModal = this.modalService.open(TransactionComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = `上映イベント ${this.event.identifier}`;
        activeModal.componentInstance.event = this.event;
    }
}
