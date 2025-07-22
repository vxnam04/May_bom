import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthservicesService } from '../../../data-access/services/authservices.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthservicesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      role: ['user'], // thêm dòng này
    });
  }

  onSubmit() {
    this.auth.register(this.form.value).subscribe({
      next: () => {
        alert('Đăng ký thành công, hãy đăng nhập');
        console.log('thanh cong');
        this.router.navigate(['/authentication/login']);
      },
      error: () => {
        alert('Lỗi đăng ký');
      },
    });
  }
}
