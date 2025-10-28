import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { PropertyService } from '../../services/property/property.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  user: User | null = null;
  loading = true;
  editmode = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    // Substitua pelo ID do usuário autenticado
    this.authService.currentUser().subscribe({
      next: (data) => {
        if (!data) {
          this.loading = false;
          return;
        }

        this.user = data;
        this.loading = false;

        this.userService.getUserWithProperties(data.id!).subscribe({
          next: (data) => {
            this.user = data;
            this.loading = false;
          },
          error: (err) => {
            console.error('Erro ao carregar perfil:', err);
            this.loading = false;
          },
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil:', err);
        this.loading = false;
      },
    });
  }

  edit(): void {
    this.editmode = true;
  }

  delete(): void {
    if (!this.user) return;
    if (!confirm('Você tem certeza que deseja excluir seu perfil? Esta ação é irreversível.')) {
      return;
    }
    this.userService.deleteUser(this.user.id!).subscribe({
      next: (data) => {
        console.log('Perfil excluído com sucesso:', data);
        this.authService.logout();
        this.router.navigate(['/auth']);
      },
      error: (err) => {
        console.error('Erro ao excluir perfil:', err);
      },
    });
  }

  annuler(): void {
    this.editmode = false;
    this.ngOnInit();
  }

  submit() {
    console.log(this.user);
    this.userService.updateUser(this.user!.id!, this.user).subscribe({
      next: (data) => {
        console.log('Perfil atualizado com sucesso:', data);
        this.editmode = false;
      },
      error: (err) => {
        console.error('Erro ao atualizar perfil:', err);
      },
    });
  }
}
