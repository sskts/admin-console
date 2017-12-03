import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as io from 'socket.io-client';

import { EventComponent } from './modal/event.component';

type IEvent = ssktsFactory.event.individualScreeningEvent.IEvent;
type IMovieTheater = ssktsFactory.place.movieTheater.IPlace;
type IOrder = ssktsFactory.order.IOrder;

@Component({
    selector: 'sskts-search-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
    searching = false;
    conditionsForm: FormGroup;
    socket = io();
    movieTheaters: IMovieTheater[];
    events: IEvent[] = [];
    selectedEvent: IEvent;

    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
    ) {
        // 劇場検索
        this.socket.emit('searching-movieTheaterPlaces', {});

        // 劇場検索結果
        this.socket.on('movieTheaterPlaces-found', (movieTheaters: IMovieTheater[]) => {
            this.movieTheaters = movieTheaters;
        });

        // 注文検索結果
        this.socket.on('events-found', (events: IEvent[]) => {
            this.events = events;
            this.searching = false;
        });

        this.conditionsForm = this.fb.group({
            superEventLocationIdentifiers: ['', Validators.required],
            startFrom: [''],
            startThrough: [''],
        });
    }

    onSubmit() {
        const conditions = {
            superEventLocationIdentifiers: this.conditionsForm.value.superEventLocationIdentifiers,
            startFrom: moment(this.conditionsForm.value.startFrom).toISOString(),
            startThrough: moment(this.conditionsForm.value.startThrough).add(1, 'day').toISOString(),
        };
        this.socket.emit('searching-events', conditions);
        this.searching = true;
    }

    onSelect(event: IEvent): void {
        this.selectedEvent = event;
        this.showEventModal();
    }

    showEventModal() {
        const activeModal = this.modalService.open(EventComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = `上映イベント ${this.selectedEvent.identifier}`;
        activeModal.componentInstance.event = this.selectedEvent;
    }
}
