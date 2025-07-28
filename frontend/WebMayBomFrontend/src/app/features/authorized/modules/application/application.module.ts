import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecentComponent } from './recent/recent.component';
import { ApplicationComponent } from './application.component';
import { DevicesComponent } from './devices/devices.component';
import { SupportComponent } from './support/support.component';

@NgModule({
  declarations: [
    ListComponent,
    RecentComponent,
    ApplicationComponent,
    DevicesComponent,
    SupportComponent,
  ],
  imports: [CommonModule, ApplicationRoutingModule, FormsModule, SharedModule],
})
export class ApplicationModule {}
