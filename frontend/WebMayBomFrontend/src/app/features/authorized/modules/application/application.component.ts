import { Component } from '@angular/core';
import { SidebarService } from 'src/app/data-access/services/Sidebar.servces';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
})
export class ApplicationComponent {
  sidebarActive = true;
  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarState$.subscribe(
      (state) => (this.sidebarActive = state)
    );
  }
}
