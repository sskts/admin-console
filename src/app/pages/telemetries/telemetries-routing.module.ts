import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelemetriesComponent } from './telemetries.component';

const routes: Routes = [{
    path: '',
    component: TelemetriesComponent,
    children: [
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TelemetriesRoutingModule { }

export const routedComponents = [
    TelemetriesComponent,
];
