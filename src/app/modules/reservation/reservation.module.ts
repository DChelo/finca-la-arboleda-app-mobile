import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NavParams } from '@ionic/angular';

import { ReservationPageRoutingModule } from './reservation-routing.module';

import { ReservationPage } from './reservation.page';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../shared/core.module';
import { HttpClientModule } from '@angular/common/http';
import { CabinsService } from 'src/app/services/cabins.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@NgModule({
  imports: [
    ReservationPageRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
  ],
  declarations: [ReservationPage],
  providers: [CabinsService, UploadFileService, NavParams, DatePipe],
})
export class ReservationPageModule {}
