import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input() name: string = '';
  @Input() icon: string = '';
  @Input() color: 'gold' | 'primary' | 'secondary' | 'accent' = 'primary';
}
