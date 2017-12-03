import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as io from 'socket.io-client';

import { ModalComponent } from './modal/modal.component';

type IEvent = ssktsFactory.event.individualScreeningEvent.IEvent;
type IMovieTheater = ssktsFactory.place.movieTheater.IPlace;
type IOrder = ssktsFactory.order.IOrder;

@Component({
    selector: 'sskts-search-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
    conditionsForm: FormGroup;
    socket = io();
    movieTheaters: IMovieTheater[];
    events: IEvent[];
    selectedEvent: IEvent;

    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
    ) {
        // 劇場検索
        this.socket.emit('searching-movieTheaterPlaces', {});

        // 劇場検索結果
        this.socket.on('movieTheaterPlaces-found', (movieTheaters: IMovieTheater[]) => {
            console.log(movieTheaters);
            this.movieTheaters = movieTheaters;
        });

        // 注文検索結果
        this.socket.on('events-found', (events: IEvent[]) => {
            this.events = events;
        });

        this.conditionsForm = this.fb.group({
            superEventLocationIdentifiers: ['', Validators.required],
            startFrom: [''],
            startThrough: [''],
        });
    }

    onSubmit() {
        console.log(this.conditionsForm.value);
        const conditions = {
            superEventLocationIdentifiers: this.conditionsForm.value.superEventLocationIdentifiers,
            startFrom: new Date('2017-11-30T00:00:00Z').toISOString(),
            startThrough: new Date('2017-12-01T00:00:00Z').toISOString(),
        };
        this.socket.emit('searching-events', conditions);
    }

    onSelect(event: IEvent): void {
        this.selectedEvent = event;
        this.showLargeModal();
    }

    showLargeModal() {
        const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = '上映イベント詳細';
        activeModal.componentInstance.event = this.selectedEvent;
    }
}
