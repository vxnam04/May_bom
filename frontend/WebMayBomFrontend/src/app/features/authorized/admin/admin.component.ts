import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthservicesService } from 'src/app/data-access/services/authservices.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  sidebarActive = false;
  dropdownVisible = false;

  constructor(
    private router: Router,
    private authService: AuthservicesService
  ) {}

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        this.authService.logoutAndRedirect();
      },
      error: (err) => {
        console.error('❌ Logout lỗi:', err);
        // Dù lỗi vẫn xóa token local để tránh treo đăng nhập
        this.authService.logoutAndRedirect();
      },
    });
  }
}
