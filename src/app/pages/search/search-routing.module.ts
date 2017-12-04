import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
import { EventDetailComponent } from './events/event-detail.component';
import { EventsComponent } from './events/events.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [{
    path: '',
    component: SearchComponent,
    children: [
        {
            path: 'events/:identifier',
            component: EventDetailComponent,
        },
        {
            path: 'events',
            component: EventsComponent,
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
    EventsComponent,
    EventDetailComponent,
    OrdersComponent,
];
