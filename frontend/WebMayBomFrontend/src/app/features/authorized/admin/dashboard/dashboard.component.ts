import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../data-access/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // sửa từ styleUrl sang styleUrls
})
export class DashboardComponent implements OnInit {
  users: any[] = [];

  roles: { label: string; value: number }[] = [
    { label: 'admin', value: 1 },
    { label: 'user', value: 2 },
  ];

  newUser = {
    name: '',
    email: '',
    password: '',
    role_id: undefined,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }

  addUser() {
    if (
      !this.newUser.name ||
      !this.newUser.email ||
      !this.newUser.password ||
      !this.newUser.role_id
    ) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    this.userService.createUser(this.newUser).subscribe(() => {
      this.getUsers();

      // Reset input
      this.newUser = {
        name: '',
        email: '',
        password: '',
        role_id: this.newUser.role_id,
      };
    });
  }

  deleteUser(id: number) {
    if (confirm('Xác nhận xóa?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.getUsers();
      });
    }
  }

  changeRole(user: any, event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const newRoleId = parseInt(selectedValue, 10);
    if (user.role_id !== newRoleId) {
      this.userService.updateRole(user.id, newRoleId).subscribe(() => {
        this.getUsers();
      });
    }
  }

  editUser(user: any) {
    alert('Chức năng sửa sẽ làm sau nếu cần');
  }
}
