import { AuthService } from './../services/auth/auth.service';
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

  // Hamburguer menu
  menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}
}
