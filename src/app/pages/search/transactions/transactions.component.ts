import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as io from 'socket.io-client';

import { TransactionComponent } from './modal/transaction.component';

type ITransaction = ssktsFactory.transaction.placeOrder.ITransaction;
type IMovieTheater = ssktsFactory.place.movieTheater.IPlace;
type IOrder = ssktsFactory.order.IOrder;

@Component({
    selector: 'sskts-search-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
    searching = false;
    conditionsForm: FormGroup;
    socket = io();
    movieTheaters: IMovieTheater[];
    transactions: ITransaction[] = [];
    selectedTransaction: ITransaction;

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
        this.socket.on('placeOrderTransactions-found', (transactions: ITransaction[]) => {
            this.transactions = transactions;
            this.searching = false;
        });

        this.conditionsForm = this.fb.group({
            sellerBranchCodes: ['', Validators.required],
            confirmationNumber: ['', Validators.required],
        });
    }

    onSubmit() {
        const conditions = {
            sellerBranchCodes: this.conditionsForm.value.sellerBranchCodes,
            confirmationNumber: this.conditionsForm.value.confirmationNumber,
        };
        this.socket.emit('searching-placeOrderTransactions', conditions);
        this.searching = true;
    }

    onSelect(transaction: ITransaction): void {
        this.selectedTransaction = transaction;
        this.showEventModal();
    }

    showEventModal() {
        const activeModal = this.modalService.open(TransactionComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = `注文取引 ${this.selectedTransaction.id}`;
        activeModal.componentInstance.transaction = this.selectedTransaction;
    }
}
