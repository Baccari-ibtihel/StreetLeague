import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../core/components/header.component';
import { FooterComponent } from '../../core/components/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent { }
