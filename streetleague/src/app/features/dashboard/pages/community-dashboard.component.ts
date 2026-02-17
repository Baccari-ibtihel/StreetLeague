import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-community-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-dashboard.component.html',
  styleUrls: ['./community-dashboard.component.scss']
})
export class CommunityDashboardComponent {
  constructor(public authService: AuthService) {}
}
