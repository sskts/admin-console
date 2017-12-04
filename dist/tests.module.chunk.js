webpackJsonp(["tests.module"],{

/***/ "../../../../../src/app/pages/tests/loadtest/loadtest-scenarios.component.html":
/***/ (function(module, exports) {

module.exports = "<nb-card>\n    <nb-card-header>\n        <span>シナリオつき負荷テスト</span>\n        <div class=\"input-group\">\n            <input #issueingInterval (blur)=\"updateIssueingInterval(issueingInterval.value)\" type=\"text\" class=\"form-control\" placeholder=\"\">\n            <span class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-success btn-icon\" (click)=\"startTest();\">\n                    <i class=\"nb-play\"></i>\n                </button>\n                <button type=\"button\" class=\"btn btn-danger btn-icon\" (click)=\"stopTest();\">\n                    <i class=\"nb-pause\"></i>\n                </button>\n            </span>\n        </div>\n    </nb-card-header>\n    <nb-card-body>\n        <p>{{result}}</p>\n    </nb-card-body>\n</nb-card>"

/***/ }),

/***/ "../../../../../src/app/pages/tests/loadtest/loadtest-scenarios.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadtestScenariosComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nebular_theme__ = __webpack_require__("../../../../@nebular/theme/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_data_passports_service__ = __webpack_require__("../../../../../src/app/@core/data/passports.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_data_rules_service__ = __webpack_require__("../../../../../src/app/@core/data/rules.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpHeaders */]({
        'Content-Type': 'application/json',
        Accept: 'text/plain',
    }),
};
/**
 * シナリオつき負荷テストコンポーネント
 * @class
 */
var LoadtestScenariosComponent = /** @class */ (function () {
    function LoadtestScenariosComponent(http, passportsService, rulesService, theme) {
        var _this = this;
        this.http = http;
        this.passportsService = passportsService;
        this.rulesService = rulesService;
        this.theme = theme;
        this.numberOfDatapoints = 60;
        this.result = '';
        this.themeSubscription = this.theme.getJsTheme().subscribe(function (config) {
            _this.config = config;
        });
        this.rulesService.getAll().subscribe(function (rules) {
            _this.rules = rules;
        }, function (err) {
            // no op
        });
    }
    LoadtestScenariosComponent.prototype.ngOnDestroy = function () {
        this.stopTest();
        this.themeSubscription.unsubscribe();
    };
    LoadtestScenariosComponent.prototype.updateIssueingInterval = function (value) {
        this.issueingInterval = parseInt(value, 10);
    };
    LoadtestScenariosComponent.prototype.stopTest = function () {
        if (this.timers !== undefined) {
            this.timers.forEach(function (timer) {
                clearInterval(timer);
            });
        }
    };
    LoadtestScenariosComponent.prototype.startTest = function () {
        this.stopTest();
        // this.http.get(`http://localhost:8081/dev/loadtest?numberOfTrials=100`, httpOptions)
        //     .subscribe((result: any) => {
        //         console.error('result!');
        //         console.error(result);
        //         this.result = result;
        //         // 時点での発行数データを追加
        //         // this.datasets[index].numberOfIssuedPassports += 1;
        //     },
        //     (err) => {
        //         // no op
        //     },
        // );
        return;
        // this.initalizeChart();
        // // チャートにデータを追加し続ける
        // this.timers.push(setInterval(() => {
        //     const now = new Date();
        //     this.labels4issuedPassports.push(now);
        //     this.labels4issuedPassports = this.labels4issuedPassports.slice(-this.numberOfDatapoints);
        //     this.datasets.map((dataset, index) => {
        //         // 時点での発行数データでチャートを更新
        //         this.datasets[index].data.push(this.datasets[index].numberOfIssuedPassports);
        //         this.datasets[index].data = this.datasets[index].data.slice(-this.numberOfDatapoints);
        //     });
        //     this.updateChart();
        // }, 1000));
        // // 許可証を発行し続ける
        // this.timers.push(setInterval(() => {
        //     this.datasets.map((dataset, index) => {
        //         return this.passportsService.issue({
        //             scope: dataset.scope,
        //         }).subscribe(
        //             (passport) => {
        //                 // 時点での発行数データを追加
        //                 this.datasets[index].numberOfIssuedPassports += 1;
        //             },
        //             (err) => {
        //                 // no op
        //             },
        //         );
        //     });
        // }, (this.issueingInterval !== undefined) ? this.issueingInterval : 1000));
    };
    LoadtestScenariosComponent.prototype.initalizeChart = function () {
        var colors = this.config.variables;
        var chartjs = this.config.variables.chartjs;
        this.timers = [];
        var colorChoices = this.shuffle([
            colors.primary,
            colors.success,
            colors.info,
            colors.warning,
            colors.danger,
        ]);
        this.datasets = this.rules.map(function (rule, index) {
            return {
                scope: rule.scope,
                data: [],
                color: colorChoices[index],
                numberOfIssuedPassports: 0,
            };
        });
        this.labels4issuedPassports = [];
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
                        type: 'time',
                        time: {
                            unit: 'seconds',
                            tooltipFormat: 'hh:mm:ss',
                            displayFormats: {
                                seconds: 'hh:mm:ss',
                            },
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: '日時',
                        },
                        gridLines: {
                            display: true,
                            color: chartjs.axisLineColor,
                        },
                        ticks: {
                            fontColor: chartjs.textColor,
                        },
                    },
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: '発行数(個)',
                        },
                        gridLines: {
                            display: true,
                            color: chartjs.axisLineColor,
                        },
                        ticks: {
                            fontColor: chartjs.textColor,
                        },
                    },
                ],
            },
        };
    };
    LoadtestScenariosComponent.prototype.updateChart = function () {
        var colors = this.config.variables;
        this.data = {
            labels: this.labels4issuedPassports,
            datasets: this.datasets.map(function (dataset) {
                return {
                    label: dataset.scope,
                    data: dataset.data,
                    borderColor: dataset.color,
                    backgroundColor: dataset.color,
                    fill: false,
                    borderDash: [0, 0],
                    pointRadius: 8,
                    pointHoverRadius: 10,
                };
            }),
        };
    };
    LoadtestScenariosComponent.prototype.shuffle = function (array) {
        var n = array.length;
        var t;
        var i;
        while (n) {
            i = Math.floor(Math.random() * n--);
            t = array[n];
            array[n] = array[i];
            array[i] = t;
        }
        return array;
    };
    LoadtestScenariosComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-loadtest-scenarios',
            template: __webpack_require__("../../../../../src/app/pages/tests/loadtest/loadtest-scenarios.component.html"),
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__core_data_passports_service__["a" /* PassportsService */],
            __WEBPACK_IMPORTED_MODULE_4__core_data_rules_service__["a" /* RulesService */],
            __WEBPACK_IMPORTED_MODULE_2__nebular_theme__["n" /* NbThemeService */]])
    ], LoadtestScenariosComponent);
    return LoadtestScenariosComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/tests/loadtest/loadtest.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-lg-12\">\n    <sskts-loadtest-scenarios></sskts-loadtest-scenarios>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/pages/tests/loadtest/loadtest.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/tests/loadtest/loadtest.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadtestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LoadtestComponent = /** @class */ (function () {
    function LoadtestComponent() {
    }
    LoadtestComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-tests-loadtest',
            styles: [__webpack_require__("../../../../../src/app/pages/tests/loadtest/loadtest.component.scss")],
            template: __webpack_require__("../../../../../src/app/pages/tests/loadtest/loadtest.component.html"),
        })
    ], LoadtestComponent);
    return LoadtestComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/tests/tests-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestsRoutingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return routedComponents; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tests_component__ = __webpack_require__("../../../../../src/app/pages/tests/tests.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loadtest_loadtest_component__ = __webpack_require__("../../../../../src/app/pages/tests/loadtest/loadtest.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [{
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__tests_component__["a" /* TestsComponent */],
        children: [
            {
                path: 'loadtest',
                component: __WEBPACK_IMPORTED_MODULE_3__loadtest_loadtest_component__["a" /* LoadtestComponent */],
            },
        ],
    }];
var TestsRoutingModule = /** @class */ (function () {
    function TestsRoutingModule() {
    }
    TestsRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]],
        })
    ], TestsRoutingModule);
    return TestsRoutingModule;
}());

var routedComponents = [
    __WEBPACK_IMPORTED_MODULE_2__tests_component__["a" /* TestsComponent */],
    __WEBPACK_IMPORTED_MODULE_3__loadtest_loadtest_component__["a" /* LoadtestComponent */],
];


/***/ }),

/***/ "../../../../../src/app/pages/tests/tests.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TestsComponent = /** @class */ (function () {
    function TestsComponent() {
    }
    TestsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sskts-tests',
            template: "\n    <router-outlet></router-outlet>\n  ",
        })
    ], TestsComponent);
    return TestsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/tests/tests.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestsModule", function() { return TestsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_echarts__ = __webpack_require__("../../../../ngx-echarts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__swimlane_ngx_charts__ = __webpack_require__("../../../../@swimlane/ngx-charts/release/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__swimlane_ngx_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__swimlane_ngx_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_chartjs__ = __webpack_require__("../../../../angular2-chartjs/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_chartjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_chartjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__theme_theme_module__ = __webpack_require__("../../../../../src/app/@theme/theme.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tests_routing_module__ = __webpack_require__("../../../../../src/app/pages/tests/tests-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loadtest_loadtest_scenarios_component__ = __webpack_require__("../../../../../src/app/pages/tests/loadtest/loadtest-scenarios.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var components = [
    __WEBPACK_IMPORTED_MODULE_6__loadtest_loadtest_scenarios_component__["a" /* LoadtestScenariosComponent */],
];
var TestsModule = /** @class */ (function () {
    function TestsModule() {
    }
    TestsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_4__theme_theme_module__["a" /* ThemeModule */], __WEBPACK_IMPORTED_MODULE_5__tests_routing_module__["a" /* TestsRoutingModule */], __WEBPACK_IMPORTED_MODULE_1_ngx_echarts__["a" /* AngularEchartsModule */], __WEBPACK_IMPORTED_MODULE_2__swimlane_ngx_charts__["NgxChartsModule"], __WEBPACK_IMPORTED_MODULE_3_angular2_chartjs__["ChartModule"]],
            declarations: __WEBPACK_IMPORTED_MODULE_5__tests_routing_module__["b" /* routedComponents */].concat(components),
        })
    ], TestsModule);
    return TestsModule;
}());



/***/ })

});
//# sourceMappingURL=tests.module.chunk.js.map