import { Routes } from '@angular/router';
import { HealthDashboardComponent } from './pages/health-dashboard.component';
import { HealthProfileComponent } from './pages/health-profile.component';
import { HealthAppointmentsComponent } from './pages/health-appointments.component';
import { HealthMedicalRecordsComponent } from './pages/health-medical-records.component';
import { HealthDietPlansComponent } from './pages/health-diet-plans.component';

export const HEALTH_ROUTES: Routes = [
  { path: '', component: HealthDashboardComponent },
  { path: 'profile', component: HealthProfileComponent },
  { path: 'appointments', component: HealthAppointmentsComponent },
  { path: 'records', component: HealthMedicalRecordsComponent },
  { path: 'diet', component: HealthDietPlansComponent }
];
