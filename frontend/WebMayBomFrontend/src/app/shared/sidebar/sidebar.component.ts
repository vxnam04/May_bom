import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthservicesService } from 'src/app/data-access/services/authservices.service';
import { SidebarService } from 'src/app/data-access/services/Sidebar.servces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  sidebarActive: boolean = true;

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthservicesService
  ) {}

  ngOnInit(): void {
    this.sidebarService.sidebarState$.subscribe((state) => {
      this.sidebarActive = state;
    });
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
