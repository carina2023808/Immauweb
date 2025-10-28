import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  standalone: true,
   imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {
  isLoginMode = true;
  firstname = '';
  lastname = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMsg = '';
  successMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() { this.isLoginMode = !this.isLoginMode; }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login({ email: this.email, password: this.password })
        .subscribe({
          next: (res) => {
            // this.successMsg = 'Login réalisé avec sucess!';
            // this.errorMsg = '';
            console.log('Login réalisé avec sucess!'),res;


            //redirect to dashboard or home
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.errorMsg = err.error?.message || 'Falha no login.';
            this.successMsg = '';
          }
        });
    } else {
      if (this.password !== this.confirmPassword) {
        this.errorMsg = 'Senhas não coincidem!';
        this.successMsg = '';
        return;
      }
      this.authService.register({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      }).subscribe({
        next: () => {
          this.successMsg = 'Cadastro efetuado! Agora você pode fazer login.';
          this.errorMsg = '';
          this.toggleMode();
        },
        error: (err) => {
          this.errorMsg = err.error?.message || 'Erro ao registrar.';
          this.successMsg = '';
        }
      });
    }
  }
}
