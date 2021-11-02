import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyeditPageRoutingModule } from './myedit-routing.module';

import { MyeditPage } from './myedit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyeditPageRoutingModule
  ],
  declarations: [MyeditPage]
})
export class MyeditPageModule {}
