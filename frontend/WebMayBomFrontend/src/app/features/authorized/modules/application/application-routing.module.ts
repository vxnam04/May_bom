import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ApplicationComponent } from './application.component';
import { RecentComponent } from './recent/recent.component';
import { DevicesComponent } from './devices/devices.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' }, // 👈 sửa lại redirect
      { path: 'list', component: ListComponent },
      { path: 'recent', component: RecentComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'support', component: SupportComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
