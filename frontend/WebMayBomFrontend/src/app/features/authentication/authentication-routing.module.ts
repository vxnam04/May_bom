import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { NewPassComponent } from './new-pass/new-pass.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'forgot-pass',
    component: ForgotPassComponent,
    pathMatch: 'full',
    data: { title: 'Quên mật khẩu' },
  },
  {
    path: 'reset-password',
    component: NewPassComponent,
    pathMatch: 'full',
    data: { title: 'Mật khẩu mới' },
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
