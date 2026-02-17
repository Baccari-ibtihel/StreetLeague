import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header.component';
import { FooterComponent } from '../../core/components/footer.component';
import { HeroSectionComponent } from './components/hero-section.component';
import { StatsSectionComponent } from './components/stats-section.component';
import { FeaturesSectionComponent } from './components/features-section.component';
import { HowItWorksComponent } from './components/how-it-works.component';
import { OwnersSectionComponent } from './components/owners-section.component';
import { TestimonialsComponent } from './components/testimonials.component';
import { CtaSectionComponent } from './components/cta-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    StatsSectionComponent,
    FeaturesSectionComponent,
    HowItWorksComponent,
    OwnersSectionComponent,
    TestimonialsComponent,
    CtaSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent { }
