import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent {
  constructor(public authService: AuthService) {}

  getProgressPercentage(): number {
    const user = this.authService.currentUser();
    if (user && user.xp && user.nextLevelXp) {
      return (user.xp / user.nextLevelXp) * 100;
    }
    return (2480 / 3000) * 100; // Default value
  }
}
