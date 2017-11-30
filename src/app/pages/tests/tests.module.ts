import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';

import { TestsRoutingModule, routedComponents } from './tests-routing.module';
import { LoadtestScenariosComponent } from './loadtest/loadtest-scenarios.component';

const components = [
  LoadtestScenariosComponent,
];

@NgModule({
  imports: [ThemeModule, TestsRoutingModule, AngularEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...routedComponents, ...components],
})
export class TestsModule { }
