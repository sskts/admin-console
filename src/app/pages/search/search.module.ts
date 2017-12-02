import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';
import { SettingsRoutingModule, routedComponents } from './search-routing.module';

@NgModule({
    imports: [
        ThemeModule,
        SettingsRoutingModule,
        ChartModule,
    ],
    declarations: [
        ...routedComponents,
    ],
    providers: [
    ],
})
export class SearchModule { }
