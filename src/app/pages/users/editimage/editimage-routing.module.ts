import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditimagePage } from './editimage.page';

const routes: Routes = [
  {
    path: '',
    component: EditimagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditimagePageRoutingModule {}
