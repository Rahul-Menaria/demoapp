import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditimagePageRoutingModule } from './editimage-routing.module';

import { EditimagePage } from './editimage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditimagePageRoutingModule
  ],
  declarations: [EditimagePage]
})
export class EditimagePageModule {}
