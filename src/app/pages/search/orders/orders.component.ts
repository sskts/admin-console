import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as io from 'socket.io-client';

type IMovieTheater = ssktsFactory.organization.movieTheater.IPublicFields;
type IOrder = ssktsFactory.order.IOrder;

@Component({
    selector: 'sskts-search-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
    conditionsForm: FormGroup;
    socket = io();
    movieTheaters: IMovieTheater[];
    orders: IOrder[];
    confirmationNumber: number;

    constructor(
        private fb: FormBuilder,
    ) {
        // 劇場検索
        this.socket.emit('searching-movieTheaters', {});

        // 劇場検索結果
        this.socket.on('movieTheaters-found', (movieTheaters: IMovieTheater[]) => {
            this.movieTheaters = movieTheaters;
        });

        // 注文検索結果
        this.socket.on('orders-found', (orders: IOrder[]) => {
            this.orders = orders;
        });

        this.conditionsForm = this.fb.group({
            sellerId: ['', Validators.required],
            confirmationNumber: ['', Validators.required],
        });
    }


    onSubmit() {
        console.log(this.conditionsForm.value);
        this.socket.emit('searching-orders', this.conditionsForm.value);
    }

    changeConfirmationNumber(value: string) {
        this.confirmationNumber = parseInt(value, 10);
    }

    search() {
    }
}
