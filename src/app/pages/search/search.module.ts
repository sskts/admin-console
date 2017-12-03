import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';
import { SettingsRoutingModule, routedComponents } from './search-routing.module';
import { ModalComponent } from './events/modal/modal.component';

const components = [
    routedComponents,
    ModalComponent,
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
        ModalComponent,
    ],
})
export class SearchModule { }
