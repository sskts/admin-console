// tslint:disable:curly

import { factory as ssktsFactory } from '@motionpicture/sskts-domain';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { TransactionsService } from '../../../@core/data/transactions.service';

import * as moment from 'moment';

import { TransactionComponent } from './modal/transaction.component';
import { initDomAdapter } from '@angular/platform-browser/src/browser';

type ITransaction = ssktsFactory.transaction.placeOrder.ITransaction;
type IMovieTheater = ssktsFactory.place.movieTheater.IPlace;
type IOrder = ssktsFactory.order.IOrder;

@Component({
    selector: 'sskts-search-transaction-detail',
    templateUrl: './transaction-detail.component.html',
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
    identifier: string;
    sub: any;
    transaction: ITransaction;
    myDiagram: any;

    constructor(
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private transactionsService: TransactionsService,
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.identifier = params['id'];

            // 取引照会
            this.transactionsService.findPlaceOrderById(this.identifier)
                .subscribe((transaction) => {
                    this.transaction = transaction;
                    this.showModal();
                });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    showModal() {
        const activeModal = this.modalService.open(TransactionComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = `注文取引 ${this.transaction.id}`;
        activeModal.componentInstance.transaction = this.transaction;
    }
}
