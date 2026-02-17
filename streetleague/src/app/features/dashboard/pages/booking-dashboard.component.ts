import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-booking-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-dashboard.component.html',
  styleUrls: ['./booking-dashboard.component.scss']
})
export class BookingDashboardComponent {
  constructor(public authService: AuthService) {}
}
