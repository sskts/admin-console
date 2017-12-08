import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';
import { SettingsRoutingModule, routedComponents } from './search-routing.module';
import { EventComponent } from './events/modal/event.component';
import { TransactionComponent } from './transactions/modal/transaction.component';

const components = [
    routedComponents,
    EventComponent,
    TransactionComponent,
];
@NgModule({
    imports: [
        ThemeModule,
        SettingsRoutingModule,
        ChartModule,
    ],
    declarations: [
        ...components,
    ],
    providers: [
    ],
    entryComponents: [
        EventComponent,
        TransactionComponent,
    ],
})
export class SearchModule { }
