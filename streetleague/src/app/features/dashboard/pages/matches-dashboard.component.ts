import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-matches-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matches-dashboard.component.html',
  styleUrls: ['./matches-dashboard.component.scss']
})
export class MatchesDashboardComponent {
  constructor(public authService: AuthService) {}
}
