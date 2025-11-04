import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from "@angular/common"

@Component({
  // standalone: true,
  imports: [FormsModule, NgIf],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 isLoginMode = true;
  firstname = '';
  lastname = '';
  email = '';
  password = '';
  confirmPassword = '';

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      // Lógica de login com email e password
      console.log('Login:', this.email, this.password);
    } else {
      // Validação simples senha/confirmação
      if (this.password !== this.confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
      }
      // Lógica de cadastro com firstname, lastname, email e password
      console.log('Registro:', this.firstname, this.lastname, this.email, this.password);
    }
  }
}
