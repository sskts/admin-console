import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
import { EventComponent } from './event/event.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [{
    path: '',
    component: SearchComponent,
    children: [
        {
            path: 'event/:identifier',
            component: EventComponent,
        },
        {
            path: 'orders',
            component: OrdersComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule { }

export const routedComponents = [
    SearchComponent,
    EventComponent,
    OrdersComponent,
];
