import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  error = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.error = '';
    const success = this.authService.login(this.email, this.password);
    if (!success) {
      this.error = 'Email ou mot de passe incorrect';
    }
  }
}
