import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedComponent } from './authorized.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    children: [
      {
        path: '',
        redirectTo: 'application',
        pathMatch: 'full',
      },
      {
        path: 'application',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/application/application.module').then(
            (m) => m.ApplicationModule
          ),
      },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizedRoutingModule {}
