import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthservicesService } from 'src/app/data-access/services/authservices.service';
import { SidebarService } from 'src/app/data-access/services/Sidebar.servces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  pumpStatus: boolean = false;
  temperature: number = 30;
  humidity: number = 60;
  humidityWarning: string = '';
  scheduledTime: string = '';
  history: string[] = [];

  ngOnInit(): void {
    this.checkHumidityWarning();
    this.sidebarService.sidebarState$.subscribe((state) => {
      this.sidebarActive = state;
    });
  }

  togglePump() {
    this.pumpStatus = !this.pumpStatus;
    this.addToHistory(this.pumpStatus ? 'Bật' : 'Tắt');
  }

  checkHumidityWarning() {
    if (this.humidity < 40) {
      this.humidityWarning = '⚠️ Độ ẩm quá thấp! Cần tưới.';
    } else if (this.humidity > 80) {
      this.humidityWarning = '⚠️ Độ ẩm cao, không nên tưới.';
    } else {
      this.humidityWarning = '✅ Độ ẩm bình thường.';
    }
  }

  schedulePump() {
    if (this.scheduledTime) {
      this.addToHistory(`Đã hẹn giờ tưới lúc ${this.scheduledTime}`);
      alert(`Đã hẹn giờ tưới lúc ${this.scheduledTime}`);
    }
  }

  addToHistory(action: string) {
    const timestamp = new Date().toLocaleString();
    this.history.unshift(`${action} lúc ${timestamp}`);
    if (this.history.length > 10) this.history.pop();
  }

  // Giả lập điều khiển giọng nói
  voiceCommand(command: string) {
    const cmd = command.toLowerCase();
    if (cmd.includes('bật')) {
      this.pumpStatus = true;
      this.addToHistory('Bật bằng giọng nói');
    } else if (cmd.includes('tắt')) {
      this.pumpStatus = false;
      this.addToHistory('Tắt bằng giọng nói');
    }
  }

  // sidebarActive = false;
  // dropdownVisible = false;

  // constructor(
  //   private router: Router,
  //   private authService: AuthservicesService
  // ) {}

  // toggleSidebar() {
  //   this.sidebarActive = !this.sidebarActive;
  // }

  // toggleDropdown() {
  //   this.dropdownVisible = !this.dropdownVisible;
  // }

  // logout() {
  //   this.authService.logout().subscribe({
  //     next: (res) => {
  //       this.authService.logoutAndRedirect();
  //     },
  //     error: (err) => {
  //       console.error('❌ Logout lỗi:', err);
  //       // Dù lỗi vẫn xóa token local để tránh treo đăng nhập
  //       this.authService.logoutAndRedirect();
  //     },
  //   });
  // }
  sidebarActive = true;
  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarState$.subscribe(
      (state) => (this.sidebarActive = state)
    );
  }
}
