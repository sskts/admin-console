import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { IRule } from './rule';
import { environment } from '../../../environments/environment';
import * as factory from '@motionpicture/sskts-factory';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class TransactionsService {
    constructor(
        private http: HttpClient,
    ) {
    }

    /**
     * 注文確認番号から注文取引を検索する
     * @param confirmationNumber 確認番号
     * @param theaterCode 劇場コード
     */
    searchPlaceOrder(conditions: {
        sellerBranchCodes: string[],
        confirmationNumber: string,
    }): Observable<factory.transaction.placeOrder.ITransaction[]> {
        return this.http.get(
            '/api/transactions/placeOrder',
            { ...httpOptions, params: conditions },
        )
            .map((transactions: factory.transaction.placeOrder.ITransaction[]) => transactions)
            .catch(this.handleError);
    }

    /**
     * IDで注文取引を検索する
     * @param id 取引ID
     */
    findPlaceOrderById(id: string): Observable<factory.transaction.placeOrder.ITransaction> {
        return this.http.get(
            `/api/transactions/placeOrder/${id}`,
            httpOptions,
        )
            .map((transaction: factory.transaction.placeOrder.ITransaction) => transaction)
            .catch(this.handleError);
    }

    /**
     * Handle Http operation that failed.
     */
    private handleError(error: any) {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        return Observable.throw(error);
    }
}
