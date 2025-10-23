import { AuthService } from './../services/auth/auth.service';
// // import { Component } from '@angular/core';
// // import { NgIf } from '@angular/common';

// // @Component({
// //   selector: 'app-navbar',
// //   templateUrl: './navbar.component.html',
// //   styleUrls: ['./navbar.component.css'],
// //   imports: [NgIf]
// // })
// // export class NavbarComponent {
// //   isLoggedIn = true;

// //   logout() {
// //     this.isLoggedIn = false;
// //   }
// // }
// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive } from '@angular/router';
// import { NgIf } from '@angular/common';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive, NgIf],
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent {
//   isLoggedIn = false;

//   logout() {
//     this.isLoggedIn = false;
//     // lógica futura de logout real aqui
//   }
// }

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public AuthService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.AuthService.isAuthenticated();
  }

  logout() {
    this.AuthService.logout();
  }
}
