import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Badge {
  id: number;
  name: string;
  category: string;
  progress: number;
  maxProgress: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-performance-tracker',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <!-- Header -->
      <h1 class="text-3xl font-bold text-text-dark mb-6">Performance & Health Tracker</h1>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="text-4xl font-bold text-primary">28</div>
          <div class="text-text-light">Buts Marqués</div>
          <div class="text-sm text-primary mt-1">↑ 3.0 ce mois</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="text-4xl font-bold text-primary">15</div>
          <div class="text-text-light">Passes Décisives</div>
          <div class="text-sm text-primary mt-1">↑ 2.0 ce mois</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="text-4xl font-bold text-primary">42</div>
          <div class="text-text-light">Matchs Joués</div>
          <div class="text-sm text-primary mt-1">↑ 2.0 ce mois</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="text-4xl font-bold text-primary">8.4</div>
          <div class="text-text-light">Note Moyenne</div>
          <div class="text-sm text-primary mt-1">↑ 0.3 ce mois</div>
        </div>
      </div>

      <!-- Graphique et Points de fidélité -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Graphique d'évolution -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Performance Evolution</h2>
          <div class="relative h-48 mb-4">
            <!-- Grille -->
            <div class="absolute inset-0 flex flex-col justify-between">
              <div class="border-t border-gray-200 w-full h-0"></div>
              <div class="border-t border-gray-200 w-full h-0"></div>
              <div class="border-t border-gray-200 w-full h-0"></div>
              <div class="border-t border-gray-200 w-full h-0"></div>
            </div>
            
            <!-- Ligne de données simplifiée -->
            <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
              <polyline
                points="0,40 10,35 20,25 30,30 40,20 50,25 60,15 70,10 80,5 90,8 100,12"
                fill="none"
                stroke="#1DB954"
                stroke-width="2"
              />
              <circle cx="0" cy="40" r="2" fill="#1DB954" />
              <circle cx="10" cy="35" r="2" fill="#1DB954" />
              <circle cx="20" cy="25" r="2" fill="#1DB954" />
              <circle cx="30" cy="30" r="2" fill="#1DB954" />
              <circle cx="40" cy="20" r="2" fill="#1DB954" />
              <circle cx="50" cy="25" r="2" fill="#1DB954" />
              <circle cx="60" cy="15" r="2" fill="#1DB954" />
              <circle cx="70" cy="10" r="2" fill="#1DB954" />
              <circle cx="80" cy="5" r="2" fill="#1DB954" />
              <circle cx="90" cy="8" r="2" fill="#1DB954" />
              <circle cx="100" cy="12" r="2" fill="#1DB954" />
            </svg>
          </div>
          <div class="flex justify-between text-xs text-text-light">
            <span>M1</span><span>M2</span><span>M3</span><span>M4</span><span>M5</span>
            <span>M6</span><span>M7</span><span>M8</span><span>M9</span><span>M10</span>
          </div>
        </div>

        <!-- Points de fidélité -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-start mb-4">
            <span class="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Niveau Gold</span>
            <span class="text-xs text-text-light">Temps réel</span>
          </div>
          <div class="text-5xl font-bold text-primary mb-2">2,340</div>
          <div class="text-sm text-text-light mb-2">points</div>
          <div class="text-green-600 text-sm mb-4 flex items-center">
            <i class="fas fa-arrow-up mr-1"></i>+150 points récemment!
          </div>
          <div class="mb-4">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-text-light">Prochain niveau</span>
              <span class="text-primary">660 points restants</span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full" style="width: 78%"></div>
            </div>
          </div>
          <div class="flex space-x-2">
            <button class="flex-1 bg-gray-100 text-text-dark py-2 rounded-lg hover:bg-gray-200 transition text-sm">
              Récompenses
            </button>
            <button class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition text-sm">
              Voir
            </button>
          </div>
        </div>
      </div>

      <!-- Badge Gallery et Classement -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Badge Gallery -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Badge Gallery</h2>
            <span class="text-primary font-semibold">3/6 Obtenus</span>
          </div>
          
          <!-- Filtres -->
          <div class="flex space-x-2 mb-4 overflow-x-auto">
            <button class="px-3 py-1 bg-primary text-white rounded-full text-sm whitespace-nowrap">Tous</button>
            <button class="px-3 py-1 bg-gray-100 text-text-dark hover:bg-primary/10 rounded-full text-sm whitespace-nowrap">performance</button>
            <button class="px-3 py-1 bg-gray-100 text-text-dark hover:bg-primary/10 rounded-full text-sm whitespace-nowrap">achievement</button>
            <button class="px-3 py-1 bg-gray-100 text-text-dark hover:bg-primary/10 rounded-full text-sm whitespace-nowrap">social</button>
            <button class="px-3 py-1 bg-gray-100 text-text-dark hover:bg-primary/10 rounded-full text-sm whitespace-nowrap">loyalty</button>
          </div>
          
          <!-- Badges -->
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-background-light rounded-lg p-3">
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <i class="fas fa-crown text-xs"></i>
                </div>
                <div>
                  <div class="font-medium text-sm">Hat-trick Hero</div>
                  <span class="text-xs text-text-light">performance</span>
                </div>
              </div>
              <div class="flex justify-between items-center text-xs mb-1">
                <span class="text-text-light">Progression</span>
                <span class="text-primary">100/100</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 100%"></div>
              </div>
            </div>
            
            <div class="bg-background-light rounded-lg p-3">
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <i class="fas fa-users text-xs"></i>
                </div>
                <div>
                  <div class="font-medium text-sm">Team Player</div>
                  <span class="text-xs text-text-light">social</span>
                </div>
              </div>
              <div class="flex justify-between items-center text-xs mb-1">
                <span class="text-text-light">Progression</span>
                <span class="text-primary">100/100</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 100%"></div>
              </div>
            </div>
            
            <div class="bg-background-light rounded-lg p-3">
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <i class="fas fa-100 text-xs"></i>
                </div>
                <div>
                  <div class="font-medium text-sm">Century Club</div>
                  <span class="text-xs text-text-light">achievement</span>
                </div>
              </div>
              <div class="flex justify-between items-center text-xs mb-1">
                <span class="text-text-light">Progression</span>
                <span class="text-yellow-600">42/100</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 42%"></div>
              </div>
            </div>
            
            <div class="bg-background-light rounded-lg p-3">
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <i class="fas fa-medal text-xs"></i>
                </div>
                <div>
                  <div class="font-medium text-sm">Golden Boot</div>
                  <span class="text-xs text-text-light">performance</span>
                </div>
              </div>
              <div class="flex justify-between items-center text-xs mb-1">
                <span class="text-text-light">Progression</span>
                <span class="text-primary">75/100</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 75%"></div>
              </div>
            </div>
            
            <div class="bg-background-light rounded-lg p-3">
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <i class="fas fa-heart text-xs"></i>
                </div>
                <div>
                  <div class="font-medium text-sm">Loyal Member</div>
                  <span class="text-xs text-text-light">loyalty</span>
                </div>
              </div>
              <div class="flex justify-between items-center text-xs mb-1">
                <span class="text-text-light">Progression</span>
                <span class="text-primary">100/100</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 100%"></div>
              </div>
            </div>
            
            <div class="bg-background-light rounded-lg p-3">
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <i class="fas fa-bolt text-xs"></i>
                </div>
                <div>
                  <div class="font-medium text-sm">Speed Demon</div>
                  <span class="text-xs text-text-light">performance</span>
                </div>
              </div>
              <div class="flex justify-between items-center text-xs mb-1">
                <span class="text-text-light">Progression</span>
                <span class="text-yellow-600">65/100</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 65%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Classement -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Classement Général</h2>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-background-light">
                <tr>
                  <th class="text-left p-3 text-sm">Rang</th>
                  <th class="text-left p-3 text-sm">Joueur</th>
                  <th class="text-center p-3 text-sm">M</th>
                  <th class="text-center p-3 text-sm">B</th>
                  <th class="text-center p-3 text-sm">P</th>
                  <th class="text-center p-3 text-sm">N</th>
                  <th class="text-center p-3 text-sm">Pts</th>
                  <th class="text-center p-3 text-sm">Évol</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b hover:bg-background-light">
                  <td class="p-3 font-bold text-primary">1</td>
                  <td class="p-3">Alex Rivera</td>
                  <td class="p-3 text-center">45</td>
                  <td class="p-3 text-center">32</td>
                  <td class="p-3 text-center">18</td>
                  <td class="p-3 text-center">9.2</td>
                  <td class="p-3 text-center font-bold text-primary">2450</td>
                  <td class="p-3 text-center"><i class="fas fa-arrow-up text-green-600"></i></td>
                </tr>
                <tr class="border-b hover:bg-background-light">
                  <td class="p-3 font-bold">2</td>
                  <td class="p-3">Jordan Smith</td>
                  <td class="p-3 text-center">42</td>
                  <td class="p-3 text-center">28</td>
                  <td class="p-3 text-center">15</td>
                  <td class="p-3 text-center">8.4</td>
                  <td class="p-3 text-center">2340</td>
                  <td class="p-3 text-center"><i class="fas fa-arrow-up text-green-600"></i></td>
                </tr>
                <tr class="border-b hover:bg-background-light">
                  <td class="p-3 font-bold">3</td>
                  <td class="p-3">Morgan Lee</td>
                  <td class="p-3 text-center">43</td>
                  <td class="p-3 text-center">15</td>
                  <td class="p-3 text-center">28</td>
                  <td class="p-3 text-center">8.8</td>
                  <td class="p-3 text-center">2320</td>
                  <td class="p-3 text-center"><i class="fas fa-arrow-up text-green-600"></i></td>
                </tr>
                <tr class="border-b hover:bg-background-light">
                  <td class="p-3 font-bold">4</td>
                  <td class="p-3">Taylor Brooks</td>
                  <td class="p-3 text-center">38</td>
                  <td class="p-3 text-center">20</td>
                  <td class="p-3 text-center">13</td>
                  <td class="p-3 text-center">8.1</td>
                  <td class="p-3 text-center">2180</td>
                  <td class="p-3 text-center"><i class="fas fa-arrow-down text-red-600"></i></td>
                </tr>
                <tr class="border-b hover:bg-background-light">
                  <td class="p-3 font-bold">5</td>
                  <td class="p-3">Casey Kim</td>
                  <td class="p-3 text-center">42</td>
                  <td class="p-3 text-center">0</td>
                  <td class="p-3 text-center">8</td>
                  <td class="p-3 text-center">8.5</td>
                  <td class="p-3 text-center">2150</td>
                  <td class="p-3 text-center"><i class="fas fa-arrow-up text-green-600"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="text-right mt-4">
            <a routerLink="/dashboard/leaderboard" class="text-primary hover:text-primary-dark text-sm">
              Voir le classement complet <i class="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Detailed Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Detailed Statistics</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-text-light text-sm">Minutes Played</div>
              <div class="text-2xl font-bold text-primary">3,240</div>
            </div>
            <div>
              <div class="text-text-light text-sm">Clean Sheets</div>
              <div class="text-2xl font-bold text-primary">12</div>
            </div>
            <div>
              <div class="text-text-light text-sm">Yellow Cards</div>
              <div class="text-2xl font-bold text-primary">3</div>
            </div>
            <div>
              <div class="text-text-light text-sm">Red Cards</div>
              <div class="text-2xl font-bold text-primary">0</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">This month</h2>
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <div class="text-2xl font-bold text-primary">8</div>
              <div class="text-text-light text-sm">Played matches</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-primary">720</div>
              <div class="text-text-light text-sm">Minutes</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-primary">5</div>
              <div class="text-text-light text-sm">Goals Scored</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PerformanceTrackerComponent { }
