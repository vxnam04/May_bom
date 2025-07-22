import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authorized',
  },
  {
    path: 'authentication',

    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'authorized',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/authorized/authorized.module').then(
        (m) => m.AuthorizedModule
      ),
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/' + '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
