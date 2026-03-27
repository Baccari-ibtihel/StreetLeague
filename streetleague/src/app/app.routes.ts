import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { DashboardLayoutComponent } from './features/dashboard/dashboard-layout.component';
import { MainDashboardComponent } from './features/dashboard/pages/main-dashboard.component';
import { ActivityDashboardComponent } from './features/dashboard/pages/activity/activity-dashboard.component';
import { TeamDetailComponent } from './features/dashboard/pages/team-detail/team-detail.component';
import { MatchesArenaComponent } from './features/dashboard/pages/matches-arena/matches-arena.component';
import { BookingSmartComponent } from './features/dashboard/pages/booking-smart/booking-smart.component';
import { TerrainsDashboardComponent } from './features/dashboard/pages/terrains-dashboard.component';
import { CommunityForumComponent } from './features/dashboard/pages/community-forum/community-forum.component';
import { PerformanceTrackerComponent } from './features/dashboard/pages/performance-tracker/performance-tracker.component';
import { CollaborationComponent } from './features/dashboard/pages/collaboration/collaboration.component';
import { SponsorsDashboardComponent } from './features/dashboard/pages/sponsors-dashboard.component';
import { AdminDashboardComponent } from './features/dashboard/pages/admin-dashboard.component';
import { HealthDashboardComponent } from './features/health/pages/health-dashboard.component';
import { HealthProfileComponent } from './features/health/pages/health-profile.component';
import { HealthAppointmentsComponent } from './features/health/pages/health-appointments.component';
import { HealthMedicalRecordsComponent } from './features/health/pages/health-medical-records.component';
import { HealthDietPlansComponent } from './features/health/pages/health-diet-plans.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: MainDashboardComponent },
      { path: 'activity', component: ActivityDashboardComponent },
      { path: 'team', component: TeamDetailComponent },
      { path: 'matches', component: MatchesArenaComponent },
      { path: 'booking', component: BookingSmartComponent },
      { path: 'terrains', component: TerrainsDashboardComponent },
      { path: 'community', component: CommunityForumComponent },
      { path: 'performance', component: PerformanceTrackerComponent },
      { path: 'collaboration', component: CollaborationComponent },
      { path: 'sponsors', component: SponsorsDashboardComponent },
      { path: 'admin', component: AdminDashboardComponent },
      { path: 'health', component: HealthDashboardComponent },
      { path: 'health/profile', component: HealthProfileComponent },
      { path: 'health/appointments', component: HealthAppointmentsComponent },
      { path: 'health/records', component: HealthMedicalRecordsComponent },
      { path: 'health/diet', component: HealthDietPlansComponent }
    ]
  }
];
