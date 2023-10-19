import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPageRoutingModule } from './report-routing.module';

import { ReportPage } from './report.page';
import { NavComponentModule } from 'src/app/components/nav/nav.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportPageRoutingModule,
    NavComponentModule
  ],
  declarations: [ReportPage]
})
export class ReportPageModule {}
