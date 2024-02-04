import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TabMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems: MenuItem[];

  constructor() {
    this.menuItems = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/', routerLinkActiveOptions: true},
      {label: 'Create Post', icon: 'pi pi-fw pi-plus', routerLink: 'create-post'},
    ]
  }


}
