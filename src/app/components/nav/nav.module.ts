import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NavComponent } from './nav.component';

@NgModule({
  declarations: [
    NavComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    NavComponent
  ]
})

export class NavComponentModule { }