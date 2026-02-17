import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sponsors-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsors-dashboard.component.html',
  styleUrls: ['./sponsors-dashboard.component.scss']
})
export class SponsorsDashboardComponent {
  constructor(public authService: AuthService) {}
}
