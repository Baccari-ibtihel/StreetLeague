import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-health-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <!-- Header -->
      <h1 class="text-3xl font-bold text-text-dark mb-6">Tableau de bord santé</h1>

      <!-- Alertes santé -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Carte IMC -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Indice de Masse Corporelle</h2>
            <i class="fas fa-heartbeat text-2xl text-primary"></i>
          </div>
          <div class="flex items-end justify-between">
            <div>
              <div class="text-4xl font-bold text-primary">{{ bmi }}</div>
              <div class="text-text-light">{{ bmiCategory }}</div>
            </div>
            <div class="text-right">
              <div class="text-sm text-text-light">Taille: 178 cm</div>
              <div class="text-sm text-text-light">Poids: 75 kg</div>
            </div>
          </div>
          <div class="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full" [style.width]="(bmi / 40) * 100 + '%'"></div>
          </div>
          <button routerLink="/dashboard/health/evolution" class="mt-4 text-primary hover:text-primary-dark text-sm font-medium">
            <i class="fas fa-chart-line mr-1"></i>Voir l'évolution
          </button>
        </div>

        <!-- Prochain rendez-vous -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Prochain rendez-vous</h2>
            <i class="fas fa-calendar-check text-2xl text-primary"></i>
          </div>
          <div *ngIf="nextAppointment; else noAppointment">
            <div class="text-lg font-medium">{{ nextAppointment.doctorName }}</div>
            <div class="text-sm text-text-light mb-3">{{ nextAppointment.type }} • {{ nextAppointment.doctorSpecialty }}</div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <i class="fas fa-calendar text-primary text-sm"></i>
                <span>{{ nextAppointment.date | date:'dd/MM/yyyy' }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="fas fa-clock text-primary text-sm"></i>
                <span>{{ nextAppointment.time }}</span>
              </div>
            </div>
            <div class="mt-3 flex space-x-2">
              <span [class]="getStatusClass(nextAppointment.status)" class="text-xs px-2 py-1 rounded-full">
                {{ nextAppointment.status }}
              </span>
              <button routerLink="/dashboard/health/appointments/{{nextAppointment.id}}" class="text-primary hover:text-primary-dark text-sm">
                Détails
              </button>
              <button routerLink="/dashboard/health/appointments/{{nextAppointment.id}}/reschedule" class="text-primary hover:text-primary-dark text-sm">
                Reprogrammer
              </button>
            </div>
          </div>
          <ng-template #noAppointment>
            <div class="text-center py-4">
              <p class="text-text-light mb-3">Aucun rendez-vous programmé</p>
              <button routerLink="/dashboard/health/appointments/new" class="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark">
                <i class="fas fa-plus mr-1"></i>Prendre rendez-vous
              </button>
            </div>
          </ng-template>
        </div>
      </div>

      <!-- Métriques actuelles -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div routerLink="/dashboard/health/metrics/poids" class="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition">
          <div class="flex items-center justify-between mb-2">
            <span class="text-text-light text-sm">Poids</span>
            <i class="fas fa-weight-scale text-primary"></i>
          </div>
          <div class="text-2xl font-bold text-primary">75 <span class="text-sm text-text-light">kg</span></div>
          <div class="text-xs text-green-600 mt-1">-1.5 kg ce mois</div>
        </div>
        
        <div routerLink="/dashboard/health/metrics/imc" class="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition">
          <div class="flex items-center justify-between mb-2">
            <span class="text-text-light text-sm">IMC</span>
            <i class="fas fa-calculator text-primary"></i>
          </div>
          <div class="text-2xl font-bold text-primary">23.7</div>
          <div class="text-xs text-green-600 mt-1">Normal</div>
        </div>
        
        <div routerLink="/dashboard/health/metrics/bodyfat" class="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition">
          <div class="flex items-center justify-between mb-2">
            <span class="text-text-light text-sm">Masse grasse</span>
            <i class="fas fa-droplet text-primary"></i>
          </div>
          <div class="text-2xl font-bold text-primary">15 <span class="text-sm text-text-light">%</span></div>
          <div class="text-xs text-green-600 mt-1">-0.5%</div>
        </div>
        
        <div routerLink="/dashboard/health/metrics/muscle" class="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition">
          <div class="flex items-center justify-between mb-2">
            <span class="text-text-light text-sm">Masse musculaire</span>
            <i class="fas fa-dumbbell text-primary"></i>
          </div>
          <div class="text-2xl font-bold text-primary">35 <span class="text-sm text-text-light">kg</span></div>
          <div class="text-xs text-green-600 mt-1">+0.7 kg</div>
        </div>
      </div>

      <!-- Graphique d'évolution -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Évolution du poids</h2>
          <div class="flex space-x-2">
            <button (click)="setChartPeriod('week')" [class]="chartPeriod === 'week' ? 'bg-primary text-white' : 'bg-gray-100 text-text-dark'" class="px-3 py-1 rounded-lg text-sm hover:bg-primary/10">Semaine</button>
            <button (click)="setChartPeriod('month')" [class]="chartPeriod === 'month' ? 'bg-primary text-white' : 'bg-gray-100 text-text-dark'" class="px-3 py-1 rounded-lg text-sm hover:bg-primary/10">Mois</button>
            <button (click)="setChartPeriod('year')" [class]="chartPeriod === 'year' ? 'bg-primary text-white' : 'bg-gray-100 text-text-dark'" class="px-3 py-1 rounded-lg text-sm hover:bg-primary/10">Année</button>
          </div>
        </div>
        <div routerLink="/dashboard/health/chart" class="h-48 bg-background-light rounded-lg flex items-center justify-center text-text-light cursor-pointer hover:bg-primary/5 transition">
          [Cliquez pour voir le graphique détaillé]
        </div>
      </div>

      <!-- Accès rapides -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div routerLink="/dashboard/health/profile" class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group cursor-pointer">
          <i class="fas fa-user-circle text-3xl text-primary mb-3 group-hover:scale-110 transition"></i>
          <h3 class="text-lg font-semibold">Profil de santé</h3>
          <p class="text-text-light text-sm">Gérer vos informations personnelles</p>
        </div>
        
        <div routerLink="/dashboard/health/appointments" class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group cursor-pointer">
          <i class="fas fa-calendar-check text-3xl text-primary mb-3 group-hover:scale-110 transition"></i>
          <h3 class="text-lg font-semibold">Rendez-vous</h3>
          <p class="text-text-light text-sm">Planifier et gérer vos consultations</p>
        </div>
        
        <div routerLink="/dashboard/health/records" class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group cursor-pointer">
          <i class="fas fa-notes-medical text-3xl text-primary mb-3 group-hover:scale-110 transition"></i>
          <h3 class="text-lg font-semibold">Dossiers médicaux</h3>
          <p class="text-text-light text-sm">Consulter votre historique médical</p>
        </div>
        
        <div routerLink="/dashboard/health/diet" class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group cursor-pointer">
          <i class="fas fa-utensils text-3xl text-primary mb-3 group-hover:scale-110 transition"></i>
          <h3 class="text-lg font-semibold">Plans alimentaires</h3>
          <p class="text-text-light text-sm">Suivre votre nutrition</p>
        </div>
      </div>
    </div>
  `
})
export class HealthDashboardComponent {
  private router = inject(Router);
  
  bmi: number = 23.7;
  bmiCategory: string = 'Poids normal';
  chartPeriod: 'week' | 'month' | 'year' = 'month';
  
  nextAppointment: any = {
    id: '1',
    doctorName: 'Dr. Martin',
    type: 'suivi',
    doctorSpecialty: 'Médecine générale',
    date: new Date('2026-03-05'),
    time: '14:30',
    status: 'confirmé'
  };

  getStatusClass(status: string): string {
    switch(status) {
      case 'confirmé': return 'bg-green-100 text-green-800';
      case 'en attente': return 'bg-yellow-100 text-yellow-800';
      case 'terminé': return 'bg-blue-100 text-blue-800';
      case 'annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  setChartPeriod(period: 'week' | 'month' | 'year') {
    this.chartPeriod = period;
    this.router.navigate(['/dashboard/health/chart', { period }]);
  }
}
