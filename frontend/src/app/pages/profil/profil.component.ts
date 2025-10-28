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

  selectedImages: string[] = [];
  selectedFiles: File[] = [];

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

    onFilesSelected(event: Event): void {
    this.selectedImages = [];
    this.selectedFiles = [];

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        let file = input.files[i];
        this.selectedFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => this.selectedImages.push(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  }

  submit() {
    const formData = new FormData();

    formData.append('firstname', this.user!.firstname!);
    formData.append('lastname', this.user!.lastname!);
    formData.append('email', this.user!.email!);
    formData.append('photo', this.selectedFiles[0]);

    this.userService.updateUser(this.user!.id!, formData).subscribe({
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
