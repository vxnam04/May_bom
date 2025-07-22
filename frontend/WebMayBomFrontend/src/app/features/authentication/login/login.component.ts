import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthservicesService } from '../../../data-access/services/authservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthservicesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {
        console.log(res.access_token);
        this.auth.saveToken(res);

        const role = res.user.role_id;
        console.log('Login thành công với vai trò:', role);

        if (role === 'admin') {
          this.router
            .navigate(['/authorized/admin'])
            .then((success) => console.log('Chuyển hướng admin:', success));
        } else if (role === 'user') {
          this.router
            .navigate(['/authorized/application/list'])
            .then((success) => console.log('Chuyển hướng user:', success));
        } else {
          alert('Vai trò không hợp lệ!');
          this.router.navigate(['/authentication/login']);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Sai tài khoản hoặc mật khẩu');
      },
    });
  }
}
