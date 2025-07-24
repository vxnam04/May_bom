import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthservicesService {
  private baseUrl = 'http://localhost:8010/api';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  logout() {
    return this.http
      .post(
        `${this.baseUrl}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Logout error', error);
          return throwError(() => error);
        })
      );
  }

  saveToken(res: any) {
    if (res && res.access_token) {
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('user', JSON.stringify(res.user));
    } else {
      console.warn('⚠️ Token không tồn tại trong response!');
    }
  }

  getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string {
    const user = this.getUser();
    return user?.role || '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logoutAndRedirect() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_role');
    this.router.navigate(['/authentication/login']);
  }
}
