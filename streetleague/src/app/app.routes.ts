import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthLayoutComponent } from './features/auth/auth-layout.component';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { DashboardLayoutComponent } from './features/dashboard/dashboard-layout.component';
import { MainDashboardComponent } from './features/dashboard/pages/main-dashboard.component';
import { ActivityDashboardComponent } from './features/dashboard/pages/activity/activity-dashboard.component';
import { TeamDetailComponent } from './features/dashboard/pages/team-detail/team-detail.component';
import { MatchesArenaComponent } from './features/dashboard/pages/matches-arena/matches-arena.component';
import { BookingSmartComponent } from './features/dashboard/pages/booking-smart/booking-smart.component';
import { CommunityForumComponent } from './features/dashboard/pages/community-forum/community-forum.component';
import { PerformanceTrackerComponent } from './features/dashboard/pages/performance-tracker/performance-tracker.component';
import { SponsorsDashboardComponent } from './features/dashboard/pages/sponsors-dashboard.component';
import { AdminDashboardComponent } from './features/dashboard/pages/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'login', 
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  { 
    path: 'register', 
    component: AuthLayoutComponent,
    children: [
      { path: '', component: RegisterComponent }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: MainDashboardComponent },
      { path: 'activity', component: ActivityDashboardComponent },
      { path: 'team', component: TeamDetailComponent },
      { path: 'matches', component: MatchesArenaComponent },
      { path: 'booking', component: BookingSmartComponent },
      { path: 'community', component: CommunityForumComponent },
      { path: 'performance', component: PerformanceTrackerComponent },
      { path: 'sponsors', component: SponsorsDashboardComponent },
      { path: 'admin', component: AdminDashboardComponent }
    ]
  }
];
