import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Lấy token trực tiếp từ localStorage
    const accessToken = localStorage.getItem('access_token') || '';

    if (accessToken && accessToken !== '') {
      console.log('thanh cong');
      return true; // Cho phép truy cập
    } else {
      // Nếu không có token, điều hướng về trang login
      console.log('k thanh cong');
      this.router.navigateByUrl('/authentication/login');

      return false;
    }
  }
}
