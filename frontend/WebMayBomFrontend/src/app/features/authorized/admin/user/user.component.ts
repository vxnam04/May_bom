import { UserService } from './../../../../data-access/services/user.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: any[] = [];

  constructor(private UserService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.UserService.getAllUsers().subscribe({
      next: (res: any) => (this.users = res),
      error: (err) => console.error('Lỗi khi tải user:', err),
    });
  }
}
