import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, ApplicationRoutingModule, FormsModule, SharedModule],
})
export class ApplicationModule {}
