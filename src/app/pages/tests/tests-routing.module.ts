import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestsComponent } from './tests.component';
import { LoadtestComponent } from './loadtest/loadtest.component';

const routes: Routes = [{
  path: '',
  component: TestsComponent,
  children: [
    {
      path: 'loadtest',
      component: LoadtestComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestsRoutingModule { }

export const routedComponents = [
  TestsComponent,
  LoadtestComponent,
];
