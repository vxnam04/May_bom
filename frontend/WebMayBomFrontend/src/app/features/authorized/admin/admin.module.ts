import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [DashboardComponent, ProductComponent, UserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    NzEmptyModule,
    NzTreeModule,
    RouterModule,
    FormsModule,
  ],
})
export class AdminModule {}
