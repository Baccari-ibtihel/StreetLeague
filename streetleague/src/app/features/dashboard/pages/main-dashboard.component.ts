import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-6">
      <!-- Welcome Header -->
      <div class="bg-gradient-to-r from-primary/20 to-secondary rounded-2xl p-8">
        <h1 class="text-3xl font-bold text-text-dark mb-2">
          Welcome Back, Jordan!
        </h1>
        <p class="text-text-light text-lg">Ready to dominate the street league today?</p>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-3xl font-bold text-primary">24</div>
          <div class="text-text-light">Matches joués</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-3xl font-bold text-primary">48h</div>
          <div class="text-text-light">Heures de jeu</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-3xl font-bold text-primary">12</div>
          <div class="text-text-light">Terrains visités</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-3xl font-bold text-primary">4.8</div>
          <div class="text-text-light">Note moyenne</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a routerLink="/dashboard/booking" class="bg-primary text-white py-3 rounded-lg text-center hover:bg-primary-dark">
          <i class="fas fa-calendar-check mr-2"></i>Réserver
        </a>
        <a routerLink="/dashboard/matches" class="border-2 border-primary text-primary py-3 rounded-lg text-center hover:bg-primary/10">
          <i class="fas fa-trophy mr-2"></i>Matches
        </a>
        <a routerLink="/dashboard/team" class="border-2 border-primary text-primary py-3 rounded-lg text-center hover:bg-primary/10">
          <i class="fas fa-users mr-2"></i>Équipe
        </a>
        <a routerLink="/dashboard/performance" class="border-2 border-primary text-primary py-3 rounded-lg text-center hover:bg-primary/10">
          <i class="fas fa-chart-line mr-2"></i>Stats
        </a>
      </div>

      <!-- Prochains matchs et Activité récente -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Prochains matchs -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Prochains matchs</h2>
          <div class="space-y-3">
            <div class="flex justify-between items-center p-3 bg-background-light rounded-lg">
              <div>
                <div class="font-semibold text-primary">Football</div>
                <div class="text-sm">Parc Central - 18:00</div>
              </div>
              <a routerLink="/dashboard/matches" class="text-primary hover:text-primary-dark">Voir</a>
            </div>
            <div class="flex justify-between items-center p-3 bg-background-light rounded-lg">
              <div>
                <div class="font-semibold text-primary">Basketball</div>
                <div class="text-sm">Court Premium - 20:00</div>
              </div>
              <a routerLink="/dashboard/matches" class="text-primary hover:text-primary-dark">Voir</a>
            </div>
          </div>
        </div>

        <!-- Activité récente -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Activité récente</h2>
          <div class="space-y-3">
            <div class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <div class="font-medium">Réservation confirmée</div>
                <div class="text-sm text-text-light">Terrain Parc Central</div>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div class="font-medium">Victoire 3-2</div>
                <div class="text-sm text-text-light">vs Les Aigles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Partenaires exclusifs -->
      <div class="mt-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-text-dark">Partenaires exclusifs</h2>
          <a routerLink="/dashboard/collaboration" class="text-primary hover:text-primary-dark">
            Voir tout <i class="fas fa-arrow-right ml-1"></i>
          </a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a routerLink="/dashboard/collaboration" class="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-4 hover:shadow-xl transition">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <i class="fas fa-tint"></i>
              </div>
              <div>
                <div class="font-semibold">EVIAN</div>
                <div class="text-xs text-text-light">-20%</div>
              </div>
            </div>
          </a>
          <a routerLink="/dashboard/collaboration" class="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-lg p-4 hover:shadow-xl transition">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
                <i class="fas fa-utensils"></i>
              </div>
              <div>
                <div class="font-semibold">McDonald's</div>
                <div class="text-xs text-text-light">-15%</div>
              </div>
            </div>
          </a>
          <a routerLink="/dashboard/collaboration" class="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-4 hover:shadow-xl transition">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                <i class="fas fa-hotel"></i>
              </div>
              <div>
                <div class="font-semibold">Ibis Budget</div>
                <div class="text-xs text-text-light">-15%</div>
              </div>
            </div>
          </a>
          <a routerLink="/dashboard/collaboration" class="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-4 hover:shadow-xl transition">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <i class="fas fa-futbol"></i>
              </div>
              <div>
                <div class="font-semibold">Decathlon</div>
                <div class="text-xs text-text-light">-10%</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  `
})
export class MainDashboardComponent { }
