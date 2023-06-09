import { NgModule } from '@angular/core';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../shared/core.module';


@NgModule({
  imports: [
    HomePageRoutingModule,
    CoreModule,
    SharedModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
