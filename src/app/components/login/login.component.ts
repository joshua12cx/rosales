import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  rememberMe: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials.username, this.credentials.password).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/home']); // Redirige al home si es exitoso
        } else {
          this.errorMessage = 'Credenciales incorrectas';
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error interno en el servidor.';
      },
    });
  }
}
