import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarState = new BehaviorSubject<boolean>(true);
  sidebarState$ = this.sidebarState.asObservable();

  toggle() {
    this.sidebarState.next(!this.sidebarState.value);
  }

  get currentState() {
    return this.sidebarState.value;
  }
}
