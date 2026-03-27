import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PlayerStats {
  name: string;
  position: string;
  goals: number;
  assists: number;
  fouls: number;
  yellowCards: number;
  redCards: boolean;
  minutesPlayed: number;
}

interface Team {
  id: number;
  name: string;
  rank: number;
  points: number;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
}

@Component({
  selector: 'app-matches-arena',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-text-dark">Match & Competition Arena</h1>
          <p class="text-text-light">Track your competitions and climb the leaderboards</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl shadow-lg p-4 text-center">
          <div class="text-3xl font-bold text-primary">48</div>
          <div class="text-sm text-text-light">Total Wins</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-4 text-center">
          <div class="text-3xl font-bold text-primary">72%</div>
          <div class="text-sm text-text-light">Win Rate</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-4 text-center">
          <div class="text-3xl font-bold text-primary">5</div>
          <div class="text-sm text-text-light">Win Streak</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-4 text-center">
          <div class="text-3xl font-bold text-primary">#3</div>
          <div class="text-sm text-text-light">League Rank</div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex space-x-4 border-b">
        <button 
          (click)="activeTab = 'upcoming'" 
          [class]="activeTab === 'upcoming' ? 'text-primary border-b-2 border-primary font-medium' : 'text-text-light font-medium'"
          class="px-4 py-2"
        >
          Upcoming Matches
        </button>
        <button 
          (click)="activeTab = 'results'" 
          [class]="activeTab === 'results' ? 'text-primary border-b-2 border-primary font-medium' : 'text-text-light font-medium'"
          class="px-4 py-2"
        >
          Recent Results
        </button>
        <button 
          (click)="activeTab = 'tournament'" 
          [class]="activeTab === 'tournament' ? 'text-primary border-b-2 border-primary font-medium' : 'text-text-light font-medium'"
          class="px-4 py-2"
        >
          Tournament Bracket
        </button>
        <button 
          (click)="activeTab = 'leaderboard'" 
          [class]="activeTab === 'leaderboard' ? 'text-primary border-b-2 border-primary font-medium' : 'text-text-light font-medium'"
          class="px-4 py-2"
        >
          Leaderboard
        </button>
      </div>

      <!-- Upcoming Matches -->
      @if (activeTab === 'upcoming') {
        <div class="space-y-4">
          <!-- Match 1 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center">
              <div>
                <div class="flex items-center space-x-3">
                  <h3 class="text-xl font-semibold">vs Street Warriors</h3>
                  <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">League Match</span>
                </div>
                <p class="text-text-light">Mar 5, 2026 • 18:00 • Central Arena</p>
              </div>
              <div class="flex space-x-2">
                <button (click)="openPrepareModal('Street Warriors')" class="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark">Préparer</button>
                <button (click)="completeMatch('Street Warriors')" class="border-2 border-primary text-primary px-4 py-2 rounded-lg text-sm hover:bg-primary/10">Terminer</button>
              </div>
            </div>
          </div>

          <!-- Match 2 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center">
              <div>
                <div class="flex items-center space-x-3">
                  <h3 class="text-xl font-semibold">vs Urban Legends</h3>
                  <span class="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">Tournament</span>
                </div>
                <p class="text-text-light">Mar 8, 2026 • 20:30 • City Stadium</p>
              </div>
              <div class="flex space-x-2">
                <button (click)="openPrepareModal('Urban Legends')" class="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark">Préparer</button>
                <button (click)="completeMatch('Urban Legends')" class="border-2 border-primary text-primary px-4 py-2 rounded-lg text-sm hover:bg-primary/10">Terminer</button>
              </div>
            </div>
          </div>

          <!-- Match 3 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center">
              <div>
                <div class="flex items-center space-x-3">
                  <h3 class="text-xl font-semibold">vs Night Hawks</h3>
                  <span class="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Friendly</span>
                </div>
                <p class="text-text-light">Mar 12, 2026 • 19:00 • West Complex</p>
              </div>
              <div class="flex space-x-2">
                <button (click)="openPrepareModal('Night Hawks')" class="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark">Préparer</button>
                <button (click)="completeMatch('Night Hawks')" class="border-2 border-primary text-primary px-4 py-2 rounded-lg text-sm hover:bg-primary/10">Terminer</button>
              </div>
            </div>
          </div>

          <!-- Schedule Button -->
          <button (click)="openScheduleModal()" class="w-full border-2 border-dashed border-primary text-primary py-4 rounded-lg hover:bg-primary/5 transition font-medium">
            <i class="fas fa-plus-circle mr-2"></i>
            + Schedule New Match
          </button>
        </div>
      }

      <!-- Recent Results -->
      @if (activeTab === 'results') {
        <div class="space-y-4">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-xl font-semibold">vs Thunder FC</h3>
                <p class="text-text-light">Feb 28, 2026</p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-green-600">3 - 1</div>
                <div class="text-sm uppercase text-green-600">WIN</div>
              </div>
            </div>
            <button (click)="viewDetails('Thunder FC')" class="mt-3 text-primary hover:text-primary-dark text-sm font-medium">
              <i class="fas fa-chart-bar mr-1"></i>
              Voir les statistiques détaillées
            </button>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-xl font-semibold">vs Storm Chasers</h3>
                <p class="text-text-light">Feb 25, 2026</p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-yellow-600">2 - 2</div>
                <div class="text-sm uppercase text-yellow-600">DRAW</div>
              </div>
            </div>
            <button (click)="viewDetails('Storm Chasers')" class="mt-3 text-primary hover:text-primary-dark text-sm font-medium">
              <i class="fas fa-chart-bar mr-1"></i>
              Voir les statistiques détaillées
            </button>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-xl font-semibold">vs Fire Dragons</h3>
                <p class="text-text-light">Feb 22, 2026</p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-red-600">1 - 2</div>
                <div class="text-sm uppercase text-red-600">LOSS</div>
              </div>
            </div>
            <button (click)="viewDetails('Fire Dragons')" class="mt-3 text-primary hover:text-primary-dark text-sm font-medium">
              <i class="fas fa-chart-bar mr-1"></i>
              Voir les statistiques détaillées
            </button>
          </div>
        </div>
      }

      <!-- Tournament Bracket -->
      @if (activeTab === 'tournament') {
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-6">Street League Championship</h2>
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <h3 class="font-semibold text-primary mb-3">Quarter Finals</h3>
              <div class="bg-gray-100 p-2 rounded mb-2">Thunder Strikers</div>
              <div class="bg-gray-100 p-2 rounded">Street Warriors</div>
            </div>
            <div>
              <h3 class="font-semibold text-primary mb-3">Semi Finals</h3>
              <div class="bg-gray-100 p-2 rounded mb-2">Thunder Strikers</div>
              <div class="bg-gray-100 p-2 rounded">TBD</div>
            </div>
            <div>
              <h3 class="font-semibold text-primary mb-3">Finals</h3>
              <div class="bg-gray-100 p-2 rounded">TBD</div>
            </div>
          </div>
        </div>
      }

      <!-- Leaderboard Tab -->
      @if (activeTab === 'leaderboard') {
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-6">Classement Général</h2>
          
          <!-- Top 3 Podium -->
          <div class="flex justify-center items-end mb-8 space-x-4">
            <div class="text-center">
              <div class="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700 mb-2">2</div>
              <div class="font-semibold">Urban Legends</div>
              <div class="text-primary font-bold">2,340 pts</div>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold text-yellow-800 mb-2">1</div>
              <div class="font-semibold text-lg">Thunder Strikers</div>
              <div class="text-primary font-bold text-xl">2,450 pts</div>
            </div>
            <div class="text-center">
              <div class="w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center text-2xl font-bold text-orange-700 mb-2">3</div>
              <div class="font-semibold">Street Warriors</div>
              <div class="text-primary font-bold">2,320 pts</div>
            </div>
          </div>

          <!-- Leaderboard Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-background-light">
                <tr>
                  <th class="text-left p-3">Rang</th>
                  <th class="text-left p-3">Équipe</th>
                  <th class="text-center p-3">Matches</th>
                  <th class="text-center p-3">Victoires</th>
                  <th class="text-center p-3">Nuls</th>
                  <th class="text-center p-3">Défaites</th>
                  <th class="text-center p-3">Points</th>
                </tr>
              </thead>
              <tbody>
                @for (team of leaderboard; track team.id) {
                  <tr class="border-b hover:bg-gray-50">
                    <td class="p-3 font-bold" [class.text-primary]="team.rank === 1" [class.text-yellow-600]="team.rank === 2" [class.text-orange-600]="team.rank === 3">
                      #{{ team.rank }}
                    </td>
                    <td class="p-3 font-medium">{{ team.name }}</td>
                    <td class="p-3 text-center">{{ team.matches }}</td>
                    <td class="p-3 text-center">{{ team.wins }}</td>
                    <td class="p-3 text-center">{{ team.draws }}</td>
                    <td class="p-3 text-center">{{ team.losses }}</td>
                    <td class="p-3 text-center font-bold text-primary">{{ team.points }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Challenge Button -->
          <div class="flex justify-center mt-6">
            <button (click)="openChallengeModal()" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark font-medium">
              <i class="fas fa-hand-fist mr-2"></i>
              Challenge une équipe
            </button>
          </div>
        </div>
      }

      <!-- Quick Actions -->
      <div class="grid grid-cols-3 gap-4">
        <button (click)="registerTournament()" class="bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition font-medium">
          <i class="fas fa-trophy mr-2"></i>
          Register Tournament
        </button>
        <button (click)="openChallengeModal()" class="border-2 border-primary text-primary py-3 rounded-lg hover:bg-primary/10 transition font-medium">
          <i class="fas fa-users mr-2"></i>
          Challenge Team
        </button>
        <button (click)="viewLeaderboard()" class="border-2 border-primary text-primary py-3 rounded-lg hover:bg-primary/10 transition font-medium">
          <i class="fas fa-chart-line mr-2"></i>
          View Leaderboard
        </button>
      </div>

      <!-- Challenge Modal -->
      @if (showChallengeModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-xl max-w-md w-full">
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">Challenge une équipe</h2>
                <button (click)="showChallengeModal = false" class="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Choisir une équipe</label>
                  <select [(ngModel)]="challenge.teamId" class="w-full border rounded-lg px-4 py-3">
                    <option value="">Sélectionner...</option>
                    @for (team of availableTeams; track team.id) {
                      <option [value]="team.id">{{ team.name }} (Rang #{{ team.rank }})</option>
                    }
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Type de match</label>
                  <select [(ngModel)]="challenge.matchType" class="w-full border rounded-lg px-4 py-3">
                    <option value="friendly">Match amical</option>
                    <option value="league">Match de championnat</option>
                    <option value="cup">Match de coupe</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Date proposée</label>
                  <input type="date" [(ngModel)]="challenge.date" class="w-full border rounded-lg px-4 py-3">
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Message (optionnel)</label>
                  <textarea [(ngModel)]="challenge.message" rows="3" class="w-full border rounded-lg px-4 py-3" placeholder="Message pour l'équipe adverse..."></textarea>
                </div>

                <div class="flex space-x-3 pt-4">
                  <button (click)="sendChallenge()" [disabled]="!challenge.teamId || !challenge.date" class="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark disabled:opacity-50">
                    Envoyer le challenge
                  </button>
                  <button (click)="showChallengeModal = false" class="flex-1 border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50">
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Prepare Match Modal -->
      @if (showPrepareModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Préparation du match vs {{ selectedMatch }}</h2>
                <button (click)="showPrepareModal = false" class="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>

              <!-- Liste des joueurs avec statistiques -->
              <div class="space-y-4">
                @for (player of teamPlayers; track player.name; let i = $index) {
                  <div class="border rounded-lg p-4">
                    <div class="flex justify-between items-center mb-3">
                      <div>
                        <span class="font-semibold text-lg">{{ player.name }}</span>
                        <span class="text-sm text-text-light ml-2">{{ player.position }}</span>
                      </div>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div>
                        <label class="block text-xs text-text-light mb-1">Buts</label>
                        <input type="number" [(ngModel)]="playerStats[i].goals" min="0" class="w-full border rounded-lg px-3 py-2">
                      </div>
                      <div>
                        <label class="block text-xs text-text-light mb-1">Passes</label>
                        <input type="number" [(ngModel)]="playerStats[i].assists" min="0" class="w-full border rounded-lg px-3 py-2">
                      </div>
                      <div>
                        <label class="block text-xs text-text-light mb-1">Fautes</label>
                        <input type="number" [(ngModel)]="playerStats[i].fouls" min="0" class="w-full border rounded-lg px-3 py-2">
                      </div>
                      <div>
                        <label class="block text-xs text-text-light mb-1">Cartons jaunes</label>
                        <input type="number" [(ngModel)]="playerStats[i].yellowCards" min="0" max="2" class="w-full border rounded-lg px-3 py-2">
                      </div>
                      <div>
                        <label class="block text-xs text-text-light mb-1">Minutes jouées</label>
                        <input type="number" [(ngModel)]="playerStats[i].minutesPlayed" min="0" max="120" value="90" class="w-full border rounded-lg px-3 py-2">
                      </div>
                    </div>

                    <div class="flex items-center mt-3">
                      <input type="checkbox" [(ngModel)]="playerStats[i].redCards" [id]="'red'+i" class="mr-2">
                      <label [for]="'red'+i" class="text-sm text-red-600">Carton rouge</label>
                    </div>
                  </div>
                }
              </div>

              <div class="flex space-x-3 mt-6">
                <button (click)="savePlayerStats()" class="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark font-medium">
                  Enregistrer les statistiques
                </button>
                <button (click)="showPrepareModal = false" class="flex-1 border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-medium">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Schedule Modal -->
      @if (showScheduleModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 class="text-2xl font-bold mb-4">Schedule New Match</h2>
            <div class="space-y-3">
              <input type="text" [(ngModel)]="newMatch.opponent" placeholder="Opponent" class="w-full border rounded-lg px-4 py-2">
              <select [(ngModel)]="newMatch.type" class="w-full border rounded-lg px-4 py-2">
                <option value="league">League Match</option>
                <option value="tournament">Tournament</option>
                <option value="friendly">Friendly</option>
              </select>
              <input type="date" [(ngModel)]="newMatch.date" class="w-full border rounded-lg px-4 py-2">
              <input type="time" [(ngModel)]="newMatch.time" class="w-full border rounded-lg px-4 py-2">
              <input type="text" [(ngModel)]="newMatch.location" placeholder="Location" class="w-full border rounded-lg px-4 py-2">
              <div class="flex space-x-3 pt-4">
                <button (click)="scheduleMatch()" class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">Schedule</button>
                <button (click)="showScheduleModal = false" class="flex-1 border-2 border-gray-300 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Success Message -->
      @if (showSuccessMessage) {
        <div class="fixed bottom-4 right-4 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg animate-pulse">
          <i class="fas fa-check-circle mr-2"></i>
          {{ successMessage }}
        </div>
      }
    </div>
  `
})
export class MatchesArenaComponent {
  activeTab: 'upcoming' | 'results' | 'tournament' | 'leaderboard' = 'upcoming';
  showPrepareModal = false;
  showScheduleModal = false;
  showChallengeModal = false;
  showSuccessMessage = false;
  successMessage = '';
  selectedMatch = '';

  // Équipe type
  teamPlayers = [
    { name: 'Alex Rivera', position: 'Captain' },
    { name: 'Morgan Lee', position: 'Forward' },
    { name: 'Jordan Chen', position: 'Defender' },
    { name: 'Taylor Brooks', position: 'Midfielder' },
    { name: 'Casey Kim', position: 'Goalkeeper' },
    { name: 'Sam Taylor', position: 'Forward' }
  ];

  // Statistiques des joueurs
  playerStats: PlayerStats[] = [];

  // Leaderboard
  leaderboard: Team[] = [
    { id: 1, name: 'Thunder Strikers', rank: 1, points: 2450, matches: 42, wins: 28, draws: 8, losses: 6 },
    { id: 2, name: 'Urban Legends', rank: 2, points: 2340, matches: 42, wins: 26, draws: 9, losses: 7 },
    { id: 3, name: 'Street Warriors', rank: 3, points: 2320, matches: 42, wins: 25, draws: 10, losses: 7 },
    { id: 4, name: 'Fire Dragons', rank: 4, points: 2180, matches: 42, wins: 22, draws: 11, losses: 9 },
    { id: 5, name: 'Night Hawks', rank: 5, points: 2150, matches: 42, wins: 21, draws: 12, losses: 9 },
    { id: 6, name: 'Storm Chasers', rank: 6, points: 1980, matches: 42, wins: 18, draws: 10, losses: 14 },
    { id: 7, name: 'Thunder FC', rank: 7, points: 1850, matches: 42, wins: 16, draws: 9, losses: 17 },
    { id: 8, name: 'Elite United', rank: 8, points: 1720, matches: 42, wins: 14, draws: 8, losses: 20 }
  ];

  // Équipes disponibles pour challenge
  availableTeams = this.leaderboard.filter(team => team.name !== 'Thunder Strikers');

  // Challenge
  challenge = {
    teamId: '',
    matchType: 'friendly',
    date: '',
    message: ''
  };

  newMatch = {
    opponent: '',
    type: 'league',
    date: '',
    time: '',
    location: ''
  };

  constructor() {
    this.resetPlayerStats();
  }

  resetPlayerStats() {
    this.playerStats = this.teamPlayers.map(player => ({
      name: player.name,
      position: player.position,
      goals: 0,
      assists: 0,
      fouls: 0,
      yellowCards: 0,
      redCards: false,
      minutesPlayed: 90
    }));
  }

  openPrepareModal(opponent: string) {
    this.selectedMatch = opponent;
    this.resetPlayerStats();
    this.showPrepareModal = true;
  }

  savePlayerStats() {
    console.log('Statistiques enregistrées pour le match vs', this.selectedMatch);
    console.log(this.playerStats);
    this.showMessage(`Statistiques enregistrées pour ${this.teamPlayers.length} joueurs`);
    this.showPrepareModal = false;
  }

  completeMatch(opponent: string) {
    this.showMessage(`Match contre ${opponent} terminé ! Veuillez entrer les résultats.`);
  }

  openScheduleModal() {
    this.showScheduleModal = true;
  }

  scheduleMatch() {
    if (this.newMatch.opponent && this.newMatch.date && this.newMatch.time) {
      this.showMessage(`Match programmé contre ${this.newMatch.opponent} !`);
      this.showScheduleModal = false;
      this.newMatch = { opponent: '', type: 'league', date: '', time: '', location: '' };
    }
  }

  registerTournament() {
    this.showMessage('Inscription au tournoi confirmée !');
  }

  openChallengeModal() {
    this.challenge = { teamId: '', matchType: 'friendly', date: '', message: '' };
    this.showChallengeModal = true;
  }

  sendChallenge() {
    const selectedTeam = this.leaderboard.find(t => t.id === Number(this.challenge.teamId));
    if (selectedTeam) {
      this.showMessage(`Challenge envoyé à ${selectedTeam.name} !`);
      this.showChallengeModal = false;
      console.log('Challenge:', {
        team: selectedTeam.name,
        type: this.challenge.matchType,
        date: this.challenge.date,
        message: this.challenge.message
      });
    }
  }

  viewLeaderboard() {
    this.activeTab = 'leaderboard';
    this.showMessage('Classement chargé !');
  }

  viewDetails(opponent: string) {
    this.showMessage(`Statistiques détaillées du match contre ${opponent}`);
  }

  private showMessage(msg: string) {
    this.successMessage = msg;
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
  }
}
