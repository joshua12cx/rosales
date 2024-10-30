import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  login() {
    // Lógica de autenticación
    if (this.credentials.email === 'admin' && this.credentials.password === 'admin') {
      // Redireccionar a la página principal después de iniciar sesión
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
