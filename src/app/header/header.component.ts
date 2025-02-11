import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenuItem } from "primeng/api";
import { TabMenuModule } from "primeng/tabmenu";
import { LoginComponent } from "../login/login.component";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule, TabMenuModule, LoginComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss"
})
export class HeaderComponent {
  menuItems: MenuItem[];
  isVisible = false;

  constructor(readonly authService: AuthService) {
    this.menuItems = [
      {label: "Home", icon: "pi pi-fw pi-home", routerLink: "/", routerLinkActiveOptions: true},
      {label: "Posts", routerLink: "post"},
      {label: "Create Post", visible: false, icon: "pi pi-fw pi-plus", routerLink: "create-post"},
      {label: "Login", visible: true, command: ()=> this.isVisible = true},
      {label: "Logout", visible: false, command: ()=>this.logout()},
    ];

    this.authService.isAuthenticate().subscribe(loggedIn => {
      this.menuItems = this.menuItems.map(item => {
        if(item.label === "Create Post" || item.label === "Logout") {
          item.visible = loggedIn;
        } else if(item.label === "Login") {
          item.visible = !loggedIn;
        }
        return item;
      })
    })
  }

  logout() {
    this.authService.logout();
  }

}
