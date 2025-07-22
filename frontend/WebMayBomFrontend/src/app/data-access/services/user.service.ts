import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// 👉 Interface tùy chọn để giúp dễ autocomplete và type-check
export interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = 'http://localhost:8010/api'; // ✅ Cập nhật đúng địa chỉ backend Laravel

  constructor(private http: HttpClient) {}

  // ✅ Tạo headers kèm Bearer token
  private get headers(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Token không tồn tại trong LocalStorage');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }

  // ✅ Xử lý lỗi chung
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(
      () => error.error?.message || 'Đã xảy ra lỗi không xác định'
    );
  }

  // ✅ Lấy danh sách tất cả người dùng (chỉ admin)
  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.api}/admin/users`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // ✅ Tạo mới người dùng (chỉ admin)
  createUser(user: Partial<User>): Observable<any> {
    return this.http
      .post(`${this.api}/admin/users`, user, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // ✅ Xoá người dùng theo ID (chỉ admin)
  deleteUser(id: number): Observable<any> {
    return this.http
      .delete(`${this.api}/admin/users/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // ✅ Cập nhật quyền cho người dùng (authenticated user)
  updateRole(userId: number, roleId: number): Observable<any> {
    return this.http
      .put(
        `${this.api}/users/${userId}/role`,
        { role: roleId },
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError));
  }

  // ✅ Lấy thông tin người dùng hiện tại (authenticated)
  getCurrentUser(): Observable<User> {
    return this.http
      .get<User>(`${this.api}/user`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
}
