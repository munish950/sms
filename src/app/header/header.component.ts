import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TabMenuModule, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems: MenuItem[];
  isVisible = false;

  constructor() {
    this.menuItems = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/', routerLinkActiveOptions: true},
      {label: 'Create Post', icon: 'pi pi-fw pi-plus', routerLink: 'create-post'},
      {label: 'Login', command: ()=> this.isVisible = true},
    ]
  }

}
