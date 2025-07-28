import { Component, OnInit } from '@angular/core';
import { AuthservicesService } from 'src/app/data-access/services/authservices.service';
import { SidebarService } from 'src/app/data-access/services/Sidebar.servces';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css'],
})
export class TopnavComponent implements OnInit {
  dropdownVisible = false;
  sidebarActive = true;

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthservicesService
  ) {}

  ngOnInit(): void {
    this.sidebarService.sidebarState$.subscribe((state) => {
      this.sidebarActive = state;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.authService.logoutAndRedirect(),
      error: () => this.authService.logoutAndRedirect(),
    });
  }
}
