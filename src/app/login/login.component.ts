import { Component, HostBinding } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  token: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.saveToken(this.token);
    this.authService.verifyToken().subscribe({
      next: (response) => {
        console.log('Token valido:', response);
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        if (error.status === 401) {
          console.log('Token non valido o scaduto', error);
        } else {
          console.log('Si è verificato un errore inaspettato:', error);
        }
      },
    });
  }
}
