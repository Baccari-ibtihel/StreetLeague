import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  email = '';
  password = '';
  showPassword = false;
  error = '';

  onSubmit() {
    this.error = '';
    const success = this.authService.login(this.email, this.password);
    if (!success) {
      this.error = 'Email ou mot de passe incorrect';
    }
  }
}
