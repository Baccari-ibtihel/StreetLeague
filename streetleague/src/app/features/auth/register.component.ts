import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  selectedRole: 'player' | 'owner' = 'player';
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  onSubmit() {
    if (this.password === this.confirmPassword) {
      const success = this.authService.register({
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.selectedRole
      });
      if (success) {
        this.router.navigate(['/dashboard']);
      }
    }
  }
}
