import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopnavComponent } from './topnav/topnav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent, TopnavComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, TopnavComponent, RouterModule],
})
export class SharedModule {}
