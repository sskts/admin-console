webpackJsonp(["search.module"],{

/***/ "../../../../../src/app/pages/search/events/event-detail.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "../../../../../src/app/pages/search/events/event-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_event_component__ = __webpack_require__("../../../../../src/app/pages/search/events/modal/event.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EventDetailComponent = /** @class */ (function () {
    function EventDetailComponent(route, modalService) {
        var _this = this;
        this.route = route;
        this.modalService = modalService;
        this.socket = __WEBPACK_IMPORTED_MODULE_3_socket_io_client__();
        // イベント照会結果
        this.socket.on('event-found', function (event) {
            _this.event = event;
            _this.showEventModal();
        });
    }
    EventDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.identifier = params['identifier'];
            // イベント照会
            _this.socket.emit('finding-event', _this.identifier);
        });
    };
    EventDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    EventDetailComponent.prototype.showEventModal = function () {
        var activeModal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_4__modal_event_component__["a" /* EventComponent */], { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = "\u4E0A\u6620\u30A4\u30D9\u30F3\u30C8 " + this.event.identifier;
        activeModal.componentInstance.event = this.event;
    };
    EventDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-search-event-detail',
            template: __webpack_require__("../../../../../src/app/pages/search/events/event-detail.component.html"),
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]])
    ], EventDetailComponent);
    return EventDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/search/events/events.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <nb-card class=\"inline-form-card\">\n            <nb-card-header>上映イベント検索</nb-card-header>\n            <nb-card-body>\n                <form [formGroup]=\"conditionsForm\" (ngSubmit)=\"onSubmit()\">\n                    <div class=\"form-group\">\n                        <label>Where?</label>\n                        <select multiple class=\"form-control\" formControlName=\"superEventLocationIdentifiers\">\n                            <option *ngFor=\"let movieTheater of movieTheaters\" value=\"MovieTheater-{{movieTheater.branchCode}}\">{{movieTheater.name.ja}}</option>\n                        </select>\n                    </div>\n                    <div class=\"form-group\">\n                        <label>When?</label>\n                        <mat-form-field>\n                            <input formControlName=\"startFrom\" matInput [matDatepicker]=\"pickerStartFrom\" placeholder=\"いつから\">\n                            <mat-datepicker-toggle matSuffix [for]=\"pickerStartFrom\"></mat-datepicker-toggle>\n                            <mat-datepicker #pickerStartFrom></mat-datepicker>\n                        </mat-form-field>\n                        <mat-form-field>\n                            <input formControlName=\"startThrough\" matInput [matDatepicker]=\"pickerStartThrough\" placeholder=\"いつまで\">\n                            <mat-datepicker-toggle matSuffix [for]=\"pickerStartThrough\"></mat-datepicker-toggle>\n                            <mat-datepicker #pickerStartThrough></mat-datepicker>\n                        </mat-form-field>\n\n                        <!-- <input formControlName=\"startFrom\" type=\"text\" class=\"form-control\" placeholder=\"購入番号\" required> -->\n                    </div>\n\n                    <button type=\"submit\" class=\"btn btn-primary\">Search</button> &nbsp;\n                </form>\n            </nb-card-body>\n        </nb-card>\n    </div>\n</div>\n\n<nb-card>\n    <nb-card-header>\n        <span *ngIf=\"searching\">searching...</span>\n        <span *ngIf=\"!searching\">Results: {{events.length}} events</span>\n    </nb-card-header>\n    <nb-card-body>\n        <table class=\"table\" *ngIf=\"!searching\">\n            <thead>\n                <tr>\n                    <th>identifier</th>\n                    <th>name</th>\n                    <th>作品</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let event of events\">\n                    <th scope=\"row\" (click)=\"onSelect(event)\">{{event.identifier}}</th>\n                    <td>{{event.name.ja}}\n                        <br>{{event.name.en}}</td>\n                    <td>{{event.workPerformed.name}}\n                        <br>{{event.workPerformed.duration}}</td>\n                </tr>\n            </tbody>\n        </table>\n    </nb-card-body>\n</nb-card>"

/***/ }),

/***/ "../../../../../src/app/pages/search/events/events.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n:host-context(.nb-theme-default) /deep/ .modal-dialog {\n  max-width: 1000px; }\n\n:host-context(.nb-theme-default) sskts-search-event-modal {\n  width: 50%; }\n\n:host-context(.nb-theme-cosmic) /deep/ .modal-dialog {\n  max-width: 1000px; }\n\n:host-context(.nb-theme-cosmic) sskts-search-event-modal {\n  width: 50%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/search/events/events.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modal_event_component__ = __webpack_require__("../../../../../src/app/pages/search/events/modal/event.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EventsComponent = /** @class */ (function () {
    function EventsComponent(modalService, fb) {
        var _this = this;
        this.modalService = modalService;
        this.fb = fb;
        this.searching = false;
        this.socket = __WEBPACK_IMPORTED_MODULE_4_socket_io_client__();
        this.events = [];
        // 劇場検索
        this.socket.emit('searching-movieTheaterPlaces', {});
        // 劇場検索結果
        this.socket.on('movieTheaterPlaces-found', function (movieTheaters) {
            _this.movieTheaters = movieTheaters;
        });
        // 注文検索結果
        this.socket.on('events-found', function (events) {
            _this.events = events;
            console.log('events:', events);
            _this.searching = false;
        });
        this.conditionsForm = this.fb.group({
            superEventLocationIdentifiers: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["l" /* Validators */].required],
            startFrom: [''],
            startThrough: [''],
        });
    }
    EventsComponent.prototype.onSubmit = function () {
        var conditions = {
            superEventLocationIdentifiers: this.conditionsForm.value.superEventLocationIdentifiers,
            startFrom: __WEBPACK_IMPORTED_MODULE_3_moment__(this.conditionsForm.value.startFrom).toISOString(),
            startThrough: __WEBPACK_IMPORTED_MODULE_3_moment__(this.conditionsForm.value.startThrough).add(1, 'day').toISOString(),
        };
        this.socket.emit('searching-events', conditions);
        this.searching = true;
    };
    EventsComponent.prototype.onSelect = function (event) {
        this.selectedEvent = event;
        this.showEventModal();
    };
    EventsComponent.prototype.showEventModal = function () {
        var activeModal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_5__modal_event_component__["a" /* EventComponent */], { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = "\u4E0A\u6620\u30A4\u30D9\u30F3\u30C8 " + this.selectedEvent.identifier;
        activeModal.componentInstance.event = this.selectedEvent;
    };
    EventsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-search-events',
            template: __webpack_require__("../../../../../src/app/pages/search/events/events.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/search/events/events.component.scss")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */]])
    ], EventsComponent);
    return EventsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/search/events/modal/event.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n    <span>{{ modalHeader }}</span>\n    <button class=\"close\" aria-label=\"Close\" (click)=\"closeModal()\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>\n<div class=\"modal-body\">\n    <nb-tabset>\n        <nb-tab tabTitle=\"Details\">\n            <table class=\"table\" *ngIf=\"event && screeningRoom\">\n                <tbody>\n                    <tr>\n                        <th>identifier</th>\n                        <td>{{event.identifier}}</td>\n                    </tr>\n                    <tr>\n                        <th>name</th>\n                        <td>{{event.name.ja}}\n                            <br>{{event.name.en}}</td>\n                    </tr>\n                    <tr>\n                        <th>作品</th>\n                        <td>{{event.workPerformed.name}}\n                            <br>{{event.workPerformed.duration}}</td>\n                    </tr>\n                    <tr>\n                        <th>場所</th>\n                        <td>\n                            {{event.superEvent.location.branchCode}} {{event.location.branchCode}}\n                            <br>{{event.superEvent.location.name.ja}} {{event.location.name.ja}}\n                            <br> {{event.superEvent.location.name.en}} {{event.location.name.en}}\n                            <br>座席数:{{screeningRoom.containsPlace[0].containsPlace.length}}\n                        </td>\n                    </tr>\n                    <tr>\n                        <th>start - end</th>\n                        <td>{{event.startDate}} - {{event.endDate}}</td>\n                    </tr>\n                    <tr>\n                        <th>予約期間</th>\n                        <td>{{reservationStartDate}} - {{reservationEndDate}}</td>\n                    </tr>\n                    <tr>\n                        <th>coaInfo</th>\n                        <td>{{event.coaInfo|json}}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </nb-tab>\n\n        <nb-tab tabTitle=\"残席数遷移\">\n            <span *ngIf=\"!data\">searching...</span>\n            <chart *ngIf=\"data\" type=\"line\" [data]=\"data\" [options]=\"options\"></chart>\n        </nb-tab>\n\n        <nb-tab tabTitle=\"取引履歴\">\n            <span *ngIf=\"!datas\">searching...</span>\n            <span *ngIf=\"datas\">Results: {{datas.length}} transactions</span>\n            <table *ngIf=\"datas\" class=\"table\">\n                <thead>\n                    <tr>\n                        <th>id</th>\n                        <th>startDate</th>\n                        <th>endDate</th>\n                        <th>seats</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let data of datas\">\n                        <th scope=\"row\">{{data.id}}</th>\n                        <td>{{data.startDate}}</td>\n                        <td>{{data.endDate}}</td>\n                        <td>{{data.seatReservationAuthorizeAction.seatNumbers|json}}\n                            <br>{{data.seatReservationAuthorizeAction.endDate}}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </nb-tab>\n    </nb-tabset>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-md btn-primary\" (click)=\"closeModal()\">Close</button>\n</div>"

/***/ }),

/***/ "../../../../../src/app/pages/search/events/modal/event.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n:host-context(.nb-theme-default) /deep/ chart {\n  display: block;\n  height: 100%;\n  width: 100%; }\n\n:host-context(.nb-theme-default) nb-tabset {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n:host-context(.nb-theme-default) nb-tab {\n  height: 576px;\n  padding: 1.25rem; }\n\n:host-context(.nb-theme-cosmic) /deep/ chart {\n  display: block;\n  height: 100%;\n  width: 100%; }\n\n:host-context(.nb-theme-cosmic) nb-tabset {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n:host-context(.nb-theme-cosmic) nb-tab {\n  height: 576px;\n  padding: 1.25rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/search/events/modal/event.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nebular_theme__ = __webpack_require__("../../../../@nebular/theme/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_socket_io_client__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EventComponent = /** @class */ (function () {
    function EventComponent(activeModal, route, theme) {
        var _this = this;
        this.activeModal = activeModal;
        this.route = route;
        this.theme = theme;
        this.socket = __WEBPACK_IMPORTED_MODULE_5_socket_io_client__();
        this.transactions = [];
        this.themeSubscription = this.theme.getJsTheme().subscribe(function (config) {
            _this.config = config;
            // チャート初期化
            _this.initalizeChart();
        });
        // 劇場場所照会結果
        this.socket.on('movieTheaterPlace-found', function (movieTheater) {
            _this.movieTheater = movieTheater;
            _this.screeningRoom = movieTheater.containsPlace.find(function (place) { return place.branchCode === _this.event.location.branchCode; });
            // イベントに対する取引検索
            _this.socket.emit('searching-transactions-by-event', _this.event.identifier);
        });
        // イベント照会結果
        // this.socket.on('event-found', (event: IEvent) => {
        //     this.event = event;
        //     // 劇場場所照会
        //     this.socket.emit('finding-movieTheater-by-branchCode', this.event.superEvent.location.branchCode);
        //     // イベントに対する取引検索
        //     this.socket.emit('searching-transactions-by-event', this.event.identifier);
        // });
        // 取引検索結果
        this.socket.on('transactions-by-event-found', function (transactions) {
            _this.transactions = transactions;
            _this.datas = _this.transactions.map(function (transaction) {
                var seatReservationAuthorizeAction = transaction.object.authorizeActions.find(function (action) { return action.purpose.typeOf === 'SeatReservation'; });
                return {
                    id: transaction.id,
                    startDate: transaction.startDate,
                    endDate: transaction.endDate,
                    seatReservationAuthorizeAction: {
                        seatNumbers: seatReservationAuthorizeAction.object.offers.map(function (offer) { return offer.seatNumber; }),
                        endDate: new Date(seatReservationAuthorizeAction.endDate),
                    },
                };
            });
            var numberOfSeats = _this.screeningRoom.containsPlace[0].containsPlace.length;
            _this.datasets[0].data = _this.datas.reduce(function (a, b) {
                numberOfSeats -= b.seatReservationAuthorizeAction.seatNumbers.length;
                // 予約開始からの時間
                var diff = __WEBPACK_IMPORTED_MODULE_4_moment__(b.seatReservationAuthorizeAction.endDate).diff(__WEBPACK_IMPORTED_MODULE_4_moment__(_this.reservationStartDate), 'hours', true);
                a.push({
                    x: diff,
                    y: numberOfSeats,
                });
                return a;
            }, [{ x: 0, y: numberOfSeats }]);
            _this.updateChart();
        });
    }
    EventComponent.prototype.ngOnInit = function () {
        // 売り出し日時は？
        this.reservationStartDate = __WEBPACK_IMPORTED_MODULE_4_moment__(this.event.coaInfo.rsvStartDate + " 00:00:00+09:00", 'YYYYMMDD HH:mm:ssZ').toDate();
        this.reservationEndDate = __WEBPACK_IMPORTED_MODULE_4_moment__(this.event.coaInfo.rsvEndDate + " 23:59:59+09:00", 'YYYYMMDD HH:mm:ssZ').toDate();
        // 劇場場所照会
        this.socket.emit('finding-movieTheater-by-branchCode', this.event.superEvent.location.branchCode);
    };
    EventComponent.prototype.ngOnDestroy = function () {
        // this.sub.unsubscribe();
        // this.themeSubscription.unsubscribe();
    };
    EventComponent.prototype.initalizeChart = function () {
        var colors = this.config.variables;
        var chartjs = this.config.variables.chartjs;
        var colorChoices = [
            colors.primary,
            colors.success,
            colors.info,
            colors.warning,
            colors.danger,
        ];
        // this.data = {};
        this.datasets = [{
                scope: 'seatReservationAuthorizeAction',
                data: [],
                color: colorChoices[0],
            }];
    };
    EventComponent.prototype.updateChart = function () {
        var colors = this.config.variables;
        var chartjs = this.config.variables.chartjs;
        // 予約期間
        var reservationPeriodInMinutes = __WEBPACK_IMPORTED_MODULE_4_moment__(this.event.endDate).diff(__WEBPACK_IMPORTED_MODULE_4_moment__(this.reservationStartDate), 'hours');
        this.options = {
            // elements: {
            //     line: {
            //         tension: 0, // disables bezier curves
            //     },
            // },
            animation: {
                duration: 0,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'bottom',
                labels: {
                    fontColor: chartjs.textColor,
                },
            },
            hover: {
                mode: 'index',
            },
            scales: {
                xAxes: [
                    {
                        type: 'linear',
                        position: 'bottom',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: '経過時間(時間)',
                        },
                        gridLines: {
                            display: true,
                            color: chartjs.axisLineColor,
                        },
                        ticks: {
                            fontColor: chartjs.textColor,
                            beginAtZero: true,
                            min: 0,
                            max: reservationPeriodInMinutes,
                        },
                    },
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: '残席数',
                        },
                        gridLines: {
                            display: true,
                            color: chartjs.axisLineColor,
                        },
                        ticks: {
                            fontColor: chartjs.textColor,
                            beginAtZero: true,
                            min: 0,
                        },
                    },
                ],
            },
        };
        this.data = {
            // labels: labels,
            datasets: this.datasets.map(function (dataset) {
                return {
                    label: dataset.scope,
                    data: dataset.data,
                    borderColor: dataset.color,
                    backgroundColor: dataset.color,
                    fill: false,
                    borderDash: [0, 0],
                    pointRadius: 4,
                    pointHoverRadius: 5,
                };
            }),
        };
    };
    EventComponent.prototype.closeModal = function () {
        this.activeModal.close();
    };
    EventComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-search-event-modal',
            template: __webpack_require__("../../../../../src/app/pages/search/events/modal/event.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/search/events/modal/event.component.scss")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3__nebular_theme__["n" /* NbThemeService */]])
    ], EventComponent);
    return EventComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/search/movieTheaters/modal/movieTheater.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n    <span>{{ modalHeader }}</span>\n    <button class=\"close\" aria-label=\"Close\" (click)=\"closeModal()\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>\n<div class=\"modal-body\">\n    <nb-tabset>\n        <nb-tab tabTitle=\"ScreeningRooms\">\n            <table *ngIf=\"screeningRooms\" class=\"table\">\n                <thead>\n                    <tr>\n                        <th>branchCode</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let screeningRoom of screeningRooms\">\n                        <th scope=\"row\" (click)=\"onSelectScreeningRoom(screeningRoom)\">{{screeningRoom.branchCode}}</th>\n                    </tr>\n                </tbody>\n            </table>\n        </nb-tab>\n    </nb-tabset>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-md btn-primary\" (click)=\"closeModal()\">Close</button>\n</div>"

/***/ }),

/***/ "../../../../../src/app/pages/search/movieTheaters/modal/movieTheater.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n:host-context(.nb-theme-default) /deep/ chart {\n  display: block;\n  height: 100%;\n  width: 100%; }\n\n:host-context(.nb-theme-default) nb-tabset {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n:host-context(.nb-theme-default) nb-tab {\n  height: 576px;\n  padding: 1.25rem; }\n\n:host-context(.nb-theme-cosmic) /deep/ chart {\n  display: block;\n  height: 100%;\n  width: 100%; }\n\n:host-context(.nb-theme-cosmic) nb-tabset {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n:host-context(.nb-theme-cosmic) nb-tab {\n  height: 576px;\n  padding: 1.25rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/search/movieTheaters/modal/movieTheater.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovieTheaterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nebular_theme__ = __webpack_require__("../../../../@nebular/theme/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__screeningRoom_component__ = __webpack_require__("../../../../../src/app/pages/search/movieTheaters/modal/screeningRoom.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MovieTheaterComponent = /** @class */ (function () {
    function MovieTheaterComponent(activeModal, route, theme, modalService) {
        var _this = this;
        this.activeModal = activeModal;
        this.route = route;
        this.theme = theme;
        this.modalService = modalService;
        this.socket = __WEBPACK_IMPORTED_MODULE_4_socket_io_client__();
        this.transactions = [];
        this.themeSubscription = this.theme.getJsTheme().subscribe(function (config) {
            _this.config = config;
        });
        // 劇場場所照会結果
        this.socket.on('movieTheaterPlace-found', function (movieTheater) {
            _this.movieTheater = movieTheater;
        });
    }
    MovieTheaterComponent.prototype.ngOnInit = function () {
        this.screeningRooms = this.movieTheater.containsPlace;
    };
    MovieTheaterComponent.prototype.ngOnDestroy = function () {
        // this.sub.unsubscribe();
        // this.themeSubscription.unsubscribe();
    };
    MovieTheaterComponent.prototype.closeModal = function () {
        this.activeModal.close();
    };
    MovieTheaterComponent.prototype.onSelectScreeningRoom = function (screeningRoom) {
        this.screeningRoom = screeningRoom;
        this.showScreeningRoomModal();
    };
    MovieTheaterComponent.prototype.showScreeningRoomModal = function () {
        var activeModal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_5__screeningRoom_component__["a" /* ScreeningRoomComponent */], { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = "\u4E0A\u6620\u30EB\u30FC\u30E0 " + this.screeningRoom.branchCode;
        activeModal.componentInstance.movieTheater = this.movieTheater;
        activeModal.componentInstance.screeningRoom = this.screeningRoom;
    };
    MovieTheaterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-search-movie-theater-modal',
            template: __webpack_require__("../../../../../src/app/pages/search/movieTheaters/modal/movieTheater.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/search/movieTheaters/modal/movieTheater.component.scss")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3__nebular_theme__["n" /* NbThemeService */],
            __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]])
    ], MovieTheaterComponent);
    return MovieTheaterComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/search/movieTheaters/modal/screeningRoom.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n    <span>{{ modalHeader }}</span>\n    <button class=\"close\" aria-label=\"Close\" (click)=\"closeModal()\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>\n<div class=\"modal-body\">\n    <!-- <iframe id=\"screen\" width=\"0\" height=\"0\" src=\"https://sskts-frontend-development.azurewebsites.net/screen/?theaterCode=101&dateJouei=20180127&titleCode=99100&titleBranchNum=0&timeBegin=1310&screenCode=35&width=300\"\n        frameborder=\"0\"></iframe> -->\n\n    <nb-tabset>\n        <nb-tab *ngIf=\"aggregations\" tabTitle=\"集計\">\n            <p>{{ aggregations | json }}</p>\n\n        </nb-tab>\n    </nb-tabset>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-md btn-primary\" (click)=\"closeModal()\">Close</button>\n</div>"

/***/ }),

/***/ "../../../../../src/app/pages/search/movieTheaters/modal/screeningRoom.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n:host-context(.nb-theme-default) /deep/ chart {\n  display: block;\n  height: 100%;\n  width: 100%; }\n\n:host-context(.nb-theme-default) nb-tabset {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n:host-context(.nb-theme-default) nb-tab {\n  height: 576px;\n  padding: 1.25rem; }\n\n:host-context(.nb-theme-cosmic) /deep/ chart {\n  display: block;\n  height: 100%;\n  width: 100%; }\n\n:host-context(.nb-theme-cosmic) nb-tabset {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n:host-context(.nb-theme-cosmic) nb-tab {\n  height: 576px;\n  padding: 1.25rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/search/movieTheaters/modal/screeningRoom.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreeningRoomComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nebular_theme__ = __webpack_require__("../../../../@nebular/theme/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_socket_io_client__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ScreeningRoomComponent = /** @class */ (function () {
    function ScreeningRoomComponent(activeModal, route, theme) {
        var _this = this;
        this.activeModal = activeModal;
        this.route = route;
        this.theme = theme;
        this.socket = __WEBPACK_IMPORTED_MODULE_4_socket_io_client__();
        this.themeSubscription = this.theme.getJsTheme().subscribe(function (config) {
            _this.config = config;
        });
        this.socket.on('aggregated', function (aggregations) {
            console.log(aggregations);
            _this.aggregations = aggregations;
        });
    }
    ScreeningRoomComponent.prototype.ngOnInit = function () {
        // this.screeningRooms = this.movieTheater.containsPlace;
        // スクリーンの座席スコア集計
        this.socket.emit('aggregating-seatReservationOfferAvailableRate', this.movieTheater.branchCode, this.screeningRoom.branchCode);
    };
    ScreeningRoomComponent.prototype.ngOnDestroy = function () {
        // this.sub.unsubscribe();
        // this.themeSubscription.unsubscribe();
    };
    ScreeningRoomComponent.prototype.closeModal = function () {
        this.activeModal.close();
    };
    ScreeningRoomComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-search-screening-room-modal',
            template: __webpack_require__("../../../../../src/app/pages/search/movieTheaters/modal/screeningRoom.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/search/movieTheaters/modal/screeningRoom.component.scss")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3__nebular_theme__["n" /* NbThemeService */]])
    ], ScreeningRoomComponent);
    return ScreeningRoomComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/search/movieTheaters/movieTheater-detail.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "../../../../../src/app/pages/search/movieTheaters/movieTheater-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovieTheaterDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_movieTheater_component__ = __webpack_require__("../../../../../src/app/pages/search/movieTheaters/modal/movieTheater.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MovieTheaterDetailComponent = /** @class */ (function () {
    function MovieTheaterDetailComponent(route, modalService) {
        var _this = this;
        this.route = route;
        this.modalService = modalService;
        this.socket = __WEBPACK_IMPORTED_MODULE_3_socket_io_client__();
        // 劇場照会結果
        this.socket.on('movieTheaterPlace-found', function (movieTheater) {
            _this.movieTheater = movieTheater;
            _this.showEventModal();
        });
    }
    MovieTheaterDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.identifier = params['identifier'];
            // 劇場照会
            _this.socket.emit('finding-movieTheater-by-branchCode', _this.identifier);
        });
    };
    MovieTheaterDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    MovieTheaterDetailComponent.prototype.showEventModal = function () {
        var activeModal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_4__modal_movieTheater_component__["a" /* MovieTheaterComponent */], { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = "\u5287\u5834 " + this.movieTheater.identifier;
        activeModal.componentInstance.movieTheater = this.movieTheater;
    };
    MovieTheaterDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-search-movie-theater-detail',
            template: __webpack_require__("../../../../../src/app/pages/search/movieTheaters/movieTheater-detail.component.html"),
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]])
    ], MovieTheaterDetailComponent);
    return MovieTheaterDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/search/orders/orders.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <nb-card class=\"inline-form-card\">\n            <nb-card-header>注文検索</nb-card-header>\n            <nb-card-body>\n                <form [formGroup]=\"conditionsForm\" (ngSubmit)=\"onSubmit()\" class=\"form-inline\">\n                    <div class=\"input-group\">\n                        <div class=\"input-group-addon\">@</div>\n                        <select class=\"form-control\" formControlName=\"sellerId\">\n                            <option *ngFor=\"let movieTheater of movieTheaters\" value=\"{{movieTheater.id}}\">{{movieTheater.name.ja}}</option>\n                        </select>\n                    </div>\n                    <div class=\"input-group\">\n                        <div class=\"input-group-addon\">#</div>\n                        <input formControlName=\"confirmationNumber\" type=\"text\" class=\"form-control\" placeholder=\"購入番号\" required>\n                    </div>\n\n                    <button type=\"submit\" class=\"btn btn-primary\">Search</button> &nbsp;\n                </form>\n                <!-- <p>Form status: {{ conditionsForm.status | json }}</p> -->\n            </nb-card-body>\n        </nb-card>\n    </div>\n</div>\n\n<nb-card>\n    <nb-card-header>\n        <span>注文検索</span>\n    </nb-card-header>\n    <nb-card-body>\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th>orderNumber</th>\n                    <th>orderDate</th>\n                    <th>customer</th>\n                    <th>seller</th>\n                    <th>price</th>\n                    <th>決済方法</th>\n                    <th>割引</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let order of orders\">\n                    <th scope=\"row\">{{order.orderNumber}}</th>\n                    <td>{{order.orderDate}}</td>\n                    <td>{{order.customer.name}}\n                        <br>{{order.customer.email}}\n                        <br>{{order.customer.telephone}}</td>\n                    <td>{{order.seller.name}}</td>\n                    <td>{{order.price}} {{order.priceCurrency}}</td>\n                    <td>\n                        <ul class=\"list-group\">\n                            <li *ngFor=\"let paymentMethod of order.paymentMethods\">\n                                {{paymentMethod.name}}\n                                <br>{{paymentMethod.paymentMethod}}\n                                <br>{{paymentMethod.paymentMethodId}}\n                            </li>\n                        </ul>\n                    </td>\n                    <td>\n                        <ul class=\"list-group\">\n                            <li *ngFor=\"let discount of order.disccounts\">\n                                {{discount.name}}\n                                <br>{{discount.discountCode}}\n                                <br>{{discount.discount}} {{discount.discountCurrency}}\n                            </li>\n                        </ul>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </nb-card-body>\n</nb-card>"

/***/ }),

/***/ "../../../../../src/app/pages/search/orders/orders.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".full-width {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  min-width: 220px; }\n\nnb-checkbox {\n  margin-bottom: 1rem; }\n\n.form-inline > * {\n  margin: 0 1.5rem 1.5rem 0; }\n\nnb-card.inline-form-card nb-card-body {\n  padding-bottom: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/search/orders/orders.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrdersComponent = /** @class */ (function () {
    function OrdersComponent(fb) {
        var _this = this;
        this.fb = fb;
        this.socket = __WEBPACK_IMPORTED_MODULE_2_socket_io_client__();
        // 劇場検索
        this.socket.emit('searching-movieTheaters', {});
        // 劇場検索結果
        this.socket.on('movieTheaters-found', function (movieTheaters) {
            _this.movieTheaters = movieTheaters;
        });
        // 注文検索結果
        this.socket.on('orders-found', function (orders) {
            _this.orders = orders;
        });
        this.conditionsForm = this.fb.group({
            sellerId: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["l" /* Validators */].required],
            confirmationNumber: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["l" /* Validators */].required],
        });
    }
    OrdersComponent.prototype.onSubmit = function () {
        this.socket.emit('searching-orders', this.conditionsForm.value);
    };
    OrdersComponent.prototype.changeConfirmationNumber = function (value) {
        this.confirmationNumber = parseInt(value, 10);
    };
    OrdersComponent.prototype.search = function () {
    };
    OrdersComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-search-orders',
            template: __webpack_require__("../../../../../src/app/pages/search/orders/orders.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/search/orders/orders.component.scss")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */]])
    ], OrdersComponent);
    return OrdersComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/search/search-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsRoutingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return routedComponents; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_component__ = __webpack_require__("../../../../../src/app/pages/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events_event_detail_component__ = __webpack_require__("../../../../../src/app/pages/search/events/event-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__movieTheaters_movieTheater_detail_component__ = __webpack_require__("../../../../../src/app/pages/search/movieTheaters/movieTheater-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__events_events_component__ = __webpack_require__("../../../../../src/app/pages/search/events/events.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__transactions_transaction_detail_component__ = __webpack_require__("../../../../../src/app/pages/search/transactions/transaction-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__transactions_transactions_component__ = __webpack_require__("../../../../../src/app/pages/search/transactions/transactions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__orders_orders_component__ = __webpack_require__("../../../../../src/app/pages/search/orders/orders.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var routes = [{
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__search_component__["a" /* SearchComponent */],
        children: [
            {
                path: 'movieTheaters/:identifier',
                component: __WEBPACK_IMPORTED_MODULE_4__movieTheaters_movieTheater_detail_component__["a" /* MovieTheaterDetailComponent */],
            },
            {
                path: 'events/:identifier',
                component: __WEBPACK_IMPORTED_MODULE_3__events_event_detail_component__["a" /* EventDetailComponent */],
            },
            {
                path: 'events',
                component: __WEBPACK_IMPORTED_MODULE_5__events_events_component__["a" /* EventsComponent */],
            },
            {
                path: 'transactions/:id',
                component: __WEBPACK_IMPORTED_MODULE_6__transactions_transaction_detail_component__["a" /* TransactionDetailComponent */],
            },
            {
                path: 'transactions',
                component: __WEBPACK_IMPORTED_MODULE_7__transactions_transactions_component__["a" /* TransactionsComponent */],
            },
            {
                path: 'orders',
                component: __WEBPACK_IMPORTED_MODULE_8__orders_orders_component__["a" /* OrdersComponent */],
            },
        ],
    }];
var SettingsRoutingModule = /** @class */ (function () {
    function SettingsRoutingModule() {
    }
    SettingsRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]],
        })
    ], SettingsRoutingModule);
    return SettingsRoutingModule;
}());

var routedComponents = [
    __WEBPACK_IMPORTED_MODULE_2__search_component__["a" /* SearchComponent */],
    __WEBPACK_IMPORTED_MODULE_5__events_events_component__["a" /* EventsComponent */],
    __WEBPACK_IMPORTED_MODULE_3__events_event_detail_component__["a" /* EventDetailComponent */],
    __WEBPACK_IMPORTED_MODULE_4__movieTheaters_movieTheater_detail_component__["a" /* MovieTheaterDetailComponent */],
    __WEBPACK_IMPORTED_MODULE_8__orders_orders_component__["a" /* OrdersComponent */],
    __WEBPACK_IMPORTED_MODULE_6__transactions_transaction_detail_component__["a" /* TransactionDetailComponent */],
    __WEBPACK_IMPORTED_MODULE_7__transactions_transactions_component__["a" /* TransactionsComponent */],
];


/***/ }),

/***/ "../../../../../src/app/pages/search/search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SearchComponent = /** @class */ (function () {
    function SearchComponent() {
    }
    SearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-search',
            template: "\n    <router-outlet></router-outlet>\n  ",
        })
    ], SearchComponent);
    return SearchComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/search/search.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchModule", function() { return SearchModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_chartjs__ = __webpack_require__("../../../../angular2-chartjs/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_chartjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_chartjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__theme_theme_module__ = __webpack_require__("../../../../../src/app/@theme/theme.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_routing_module__ = __webpack_require__("../../../../../src/app/pages/search/search-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__events_modal_event_component__ = __webpack_require__("../../../../../src/app/pages/search/events/modal/event.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__movieTheaters_modal_movieTheater_component__ = __webpack_require__("../../../../../src/app/pages/search/movieTheaters/modal/movieTheater.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__movieTheaters_modal_screeningRoom_component__ = __webpack_require__("../../../../../src/app/pages/search/movieTheaters/modal/screeningRoom.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__transactions_modal_transaction_component__ = __webpack_require__("../../../../../src/app/pages/search/transactions/modal/transaction.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var components = [
    __WEBPACK_IMPORTED_MODULE_3__search_routing_module__["b" /* routedComponents */],
    __WEBPACK_IMPORTED_MODULE_4__events_modal_event_component__["a" /* EventComponent */],
    __WEBPACK_IMPORTED_MODULE_5__movieTheaters_modal_movieTheater_component__["a" /* MovieTheaterComponent */],
    __WEBPACK_IMPORTED_MODULE_6__movieTheaters_modal_screeningRoom_component__["a" /* ScreeningRoomComponent */],
    __WEBPACK_IMPORTED_MODULE_7__transactions_modal_transaction_component__["a" /* TransactionComponent */],
];
var SearchModule = /** @class */ (function () {
    function SearchModule() {
    }
    SearchModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__theme_theme_module__["a" /* ThemeModule */],
                __WEBPACK_IMPORTED_MODULE_3__search_routing_module__["a" /* SettingsRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_1_angular2_chartjs__["ChartModule"],
            ],
            declarations: components.slice(),
            providers: [],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__events_modal_event_component__["a" /* EventComponent */],
                __WEBPACK_IMPORTED_MODULE_5__movieTheaters_modal_movieTheater_component__["a" /* MovieTheaterComponent */],
                __WEBPACK_IMPORTED_MODULE_6__movieTheaters_modal_screeningRoom_component__["a" /* ScreeningRoomComponent */],
                __WEBPACK_IMPORTED_MODULE_7__transactions_modal_transaction_component__["a" /* TransactionComponent */],
            ],
        })
    ], SearchModule);
    return SearchModule;
}());



/***/ }),

/***/ "../../../../../src/app/pages/search/transactions/modal/transaction.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n    <span>{{ modalHeader }}</span>\n    <button class=\"close\" aria-label=\"Close\" (click)=\"closeModal()\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>\n<div class=\"modal-body\">\n    <nb-tabset>\n        <nb-tab tabTitle=\"Details\">\n            <table class=\"table\" *ngIf=\"transaction\">\n                <tbody>\n                    <tr>\n                        <th>id</th>\n                        <td>{{transaction.id}}</td>\n                    </tr>\n                    <tr>\n                        <th>status</th>\n                        <td>{{transaction.status}}</td>\n                    </tr>\n                    <tr>\n                        <th>date</th>\n                        <td>\n                            {{transaction.startDate}} 開始\n                            <br> {{transaction.endDate}} 成立\n                        </td>\n                    </tr>\n                    <tr>\n                        <th>customer</th>\n                        <td>\n                            {{transaction.object.customerContact.givenName}} {{transaction.object.customerContact.familyName}}\n                            <br> {{transaction.object.customerContact.telephone}}\n                            <br> {{transaction.object.customerContact.email}}\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </nb-tab>\n    </nb-tabset>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-md btn-primary\" (click)=\"closeModal()\">Close</button>\n</div>"

/***/ }),

/***/ "../../../../../src/app/pages/search/transactions/modal/transaction.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n:host-context(.nb-theme-default) /deep/ chart {\n  display: block;\n  height: 100%;\n  width: 100%; }\n\n:host-context(.nb-theme-default) nb-tabset {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n:host-context(.nb-theme-default) nb-tab {\n  height: 576px;\n  padding: 1.25rem; }\n\n:host-context(.nb-theme-cosmic) /deep/ chart {\n  display: block;\n  height: 100%;\n  width: 100%; }\n\n:host-context(.nb-theme-cosmic) nb-tabset {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n:host-context(.nb-theme-cosmic) nb-tab {\n  height: 576px;\n  padding: 1.25rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/search/transactions/modal/transaction.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nebular_theme__ = __webpack_require__("../../../../@nebular/theme/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_socket_io_client__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TransactionComponent = /** @class */ (function () {
    function TransactionComponent(activeModal, route, theme) {
        // this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        //     this.config = config;
        // });
        var _this = this;
        this.activeModal = activeModal;
        this.route = route;
        this.theme = theme;
        this.socket = __WEBPACK_IMPORTED_MODULE_4_socket_io_client__();
        this.transactions = [];
        // 劇場場所照会結果
        this.socket.on('transaction-report-created', function (report) {
            console.log(report);
            _this.report = report;
        });
    }
    TransactionComponent.prototype.ngOnInit = function () {
        console.log('converting...', this.transaction);
        // this.socket.emit('coverting-transaction-to-report', this.transaction);
    };
    TransactionComponent.prototype.ngOnDestroy = function () {
        // this.sub.unsubscribe();
        // this.themeSubscription.unsubscribe();
    };
    TransactionComponent.prototype.closeModal = function () {
        this.activeModal.close();
    };
    TransactionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-search-transaction-modal',
            template: __webpack_require__("../../../../../src/app/pages/search/transactions/modal/transaction.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/search/transactions/modal/transaction.component.scss")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3__nebular_theme__["n" /* NbThemeService */]])
    ], TransactionComponent);
    return TransactionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/search/transactions/transaction-detail.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "../../../../../src/app/pages/search/transactions/transaction-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_data_transactions_service__ = __webpack_require__("../../../../../src/app/@core/data/transactions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_transaction_component__ = __webpack_require__("../../../../../src/app/pages/search/transactions/modal/transaction.component.ts");
// tslint:disable:curly
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TransactionDetailComponent = /** @class */ (function () {
    function TransactionDetailComponent(route, modalService, transactionsService) {
        this.route = route;
        this.modalService = modalService;
        this.transactionsService = transactionsService;
    }
    TransactionDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.identifier = params['id'];
            // 取引照会
            _this.transactionsService.findPlaceOrderById(_this.identifier)
                .subscribe(function (transaction) {
                _this.transaction = transaction;
                _this.showModal();
            });
        });
    };
    TransactionDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TransactionDetailComponent.prototype.showModal = function () {
        var activeModal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_4__modal_transaction_component__["a" /* TransactionComponent */], { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = "\u6CE8\u6587\u53D6\u5F15 " + this.transaction.id;
        activeModal.componentInstance.transaction = this.transaction;
    };
    TransactionDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-search-transaction-detail',
            template: __webpack_require__("../../../../../src/app/pages/search/transactions/transaction-detail.component.html"),
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_3__core_data_transactions_service__["a" /* TransactionsService */]])
    ], TransactionDetailComponent);
    return TransactionDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/search/transactions/transactions.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <nb-card class=\"inline-form-card\">\n            <nb-card-header>取引検索</nb-card-header>\n            <nb-card-body>\n                <form [formGroup]=\"conditionsForm\" (ngSubmit)=\"onSubmit()\">\n                    <div class=\"form-group\">\n                        <label>Where?</label>\n                        <select multiple class=\"form-control\" formControlName=\"sellerBranchCodes\">\n                            <option *ngFor=\"let movieTheater of movieTheaters\" value=\"{{movieTheater.branchCode}}\">{{movieTheater.name.ja}}</option>\n                        </select>\n                    </div>\n                    <div class=\"form-group\">\n                        <label>購入番号</label>\n                        <input class=\"form-control\" formControlName=\"confirmationNumber\" type=\"text\" placeholder=\"購入番号\" required>\n                    </div>\n\n                    <button type=\"submit\" class=\"btn btn-primary\">Search</button> &nbsp;\n                </form>\n            </nb-card-body>\n        </nb-card>\n    </div>\n</div>\n\n<nb-card>\n    <nb-card-header>\n        <span *ngIf=\"searching\">searching...</span>\n        <span *ngIf=\"!searching\">Results: {{transactions.length}} events</span>\n    </nb-card-header>\n    <nb-card-body>\n        <table class=\"table\" *ngIf=\"!searching\">\n            <thead>\n                <tr>\n                    <th>id</th>\n                    <th>startDate</th>\n                    <th>endDate</th>\n                    <th>customer</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let transaction of transactions\">\n                    <th scope=\"row\" (click)=\"onSelect(transaction)\">{{transaction.id}}</th>\n                    <td>{{transaction.startDate}}</td>\n                    <td>{{transaction.endDate}}</td>\n                    <td>{{transaction.object.customerContact.givenName}}\n                        <br>{{transaction.object.customerContact.familyName}}</td>\n                </tr>\n            </tbody>\n        </table>\n    </nb-card-body>\n</nb-card>"

/***/ }),

/***/ "../../../../../src/app/pages/search/transactions/transactions.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n:host-context(.nb-theme-default) /deep/ .modal-dialog {\n  max-width: 1000px; }\n\n:host-context(.nb-theme-default) sskts-search-event-modal {\n  width: 50%; }\n\n:host-context(.nb-theme-cosmic) /deep/ .modal-dialog {\n  max-width: 1000px; }\n\n:host-context(.nb-theme-cosmic) sskts-search-event-modal {\n  width: 50%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/search/transactions/transactions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_data_transactions_service__ = __webpack_require__("../../../../../src/app/@core/data/transactions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modal_transaction_component__ = __webpack_require__("../../../../../src/app/pages/search/transactions/modal/transaction.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TransactionsComponent = /** @class */ (function () {
    function TransactionsComponent(modalService, fb, transactionsService) {
        var _this = this;
        this.modalService = modalService;
        this.fb = fb;
        this.transactionsService = transactionsService;
        this.searching = false;
        this.socket = __WEBPACK_IMPORTED_MODULE_3_socket_io_client__();
        this.transactions = [];
        // 劇場検索
        this.socket.emit('searching-movieTheaterPlaces', {});
        // 劇場検索結果
        this.socket.on('movieTheaterPlaces-found', function (movieTheaters) {
            _this.movieTheaters = movieTheaters;
        });
        this.conditionsForm = this.fb.group({
            sellerBranchCodes: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["l" /* Validators */].required],
            confirmationNumber: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["l" /* Validators */].required],
        });
    }
    TransactionsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.searching = true;
        this.transactionsService.searchPlaceOrder({
            sellerBranchCodes: this.conditionsForm.value.sellerBranchCodes,
            confirmationNumber: this.conditionsForm.value.confirmationNumber,
        }).subscribe(function (transactions) {
            _this.transactions = transactions;
            _this.searching = false;
        }, function (err) {
            console.error(err);
            _this.searching = false;
        });
    };
    TransactionsComponent.prototype.onSelect = function (transaction) {
        this.selectedTransaction = transaction;
        this.showEventModal();
    };
    TransactionsComponent.prototype.showEventModal = function () {
        var activeModal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_5__modal_transaction_component__["a" /* TransactionComponent */], { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = "\u6CE8\u6587\u53D6\u5F15 " + this.selectedTransaction.id;
        activeModal.componentInstance.transaction = this.selectedTransaction;
    };
    TransactionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-search-transactions',
            template: __webpack_require__("../../../../../src/app/pages/search/transactions/transactions.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/search/transactions/transactions.component.scss")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__core_data_transactions_service__["a" /* TransactionsService */]])
    ], TransactionsComponent);
    return TransactionsComponent;
}());



/***/ })

});
//# sourceMappingURL=search.module.chunk.js.map