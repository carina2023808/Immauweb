import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoginMode = true;
  firstname = '';
  lastname = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      // Aqui vai a lógica para login
      console.log('Login:', this.email, this.password);
    } else {
      // Validação básica para confirmar senha no registro
      if (this.password !== this.confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }
      // Aqui vai a lógica para registro
      console.log('Registro:', this.email, this.password);
    }
  }
}
