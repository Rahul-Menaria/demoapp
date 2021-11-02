import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyeditPage } from './myedit.page';

const routes: Routes = [
  {
    path: '',
    component: MyeditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyeditPageRoutingModule {}
