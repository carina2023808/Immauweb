
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [NgForOf, NgIf]
})
export class UserComponent implements OnInit {
  users: any[] = [];
  loading = false

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erro ao carregar usuários:', err)
    });
  }
}
