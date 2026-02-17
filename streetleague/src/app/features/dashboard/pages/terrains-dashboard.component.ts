import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-terrains-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terrains-dashboard.component.html',
  styleUrls: ['./terrains-dashboard.component.scss']
})
export class TerrainsDashboardComponent {
  constructor(public authService: AuthService) {}
}
