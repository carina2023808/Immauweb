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

import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { User } from '../models/user';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf,CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  currentUser: User | null = null;
  constructor(public AuthService: AuthService) {}

  ngOnInit() {
    this.AuthService.currentUser().subscribe((user) => {
      // lógica adicional se necessário
      this.currentUser = user;
    });
  }


  get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  logout() {
    this.AuthService.logout();
  }
}
