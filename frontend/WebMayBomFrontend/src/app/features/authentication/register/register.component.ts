import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user'],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('❌ Form không hợp lệ:', this.form.value);
      alert('Vui lòng điền đầy đủ thông tin hợp lệ!');
      return;
    }

    console.log('✅ Dữ liệu gửi đi:', this.form.value); // log để kiểm tra

    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/authentication/login']);
      },
      error: (err) => {
        console.error('❌ Lỗi đăng ký:', err);
        // Có thể in rõ hơn lỗi từ Laravel:
        if (err.status === 400) {
          alert('Dữ liệu không hợp lệ: ' + JSON.stringify(err.error));
        } else {
          alert('Lỗi máy chủ');
        }
      },
    });
  }
}
