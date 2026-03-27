import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-menu.component.html',
  styleUrls: []
})
export class UserMenuComponent {
  authService = inject(AuthService);
}
