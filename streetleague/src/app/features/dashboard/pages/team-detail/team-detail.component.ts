import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  role: string;
  matches: number;
  goals: number;
  assists: number;
  avatar?: string;
}

interface Challenge {
  id: number;
  opponentTeam: string;
  type: 'amical' | 'championnat' | 'tournoi';
  date: string;
  time: string;
  location: string;
  status: 'en_attente' | 'accepté' | 'refusé';
  message?: string;
}

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <!-- Team Header -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold text-primary">Thunder Strikers</h1>
            <div class="flex items-center space-x-4 mt-2 text-text-light">
              <span><i class="fas fa-users mr-2"></i>8 Members</span>
              <span><i class="fas fa-trophy mr-2"></i>Rank #3</span>
              <span><i class="fas fa-star mr-2"></i>2,450 Points</span>
            </div>
          </div>
          <div class="flex space-x-3">
            <button (click)="openTeamSettings()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
              <i class="fas fa-cog mr-2"></i>
              Team Settings
            </button>
            <button (click)="openChallengeModal()" class="border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition">
              <i class="fas fa-hand-fist mr-2"></i>
              Start Challenge
            </button>
          </div>
        </div>

        <!-- Match Stats -->
        <div class="grid grid-cols-2 gap-4 mt-6">
          <div class="bg-background-light p-4 rounded-lg text-center">
            <div class="text-3xl font-bold text-primary">48</div>
            <div class="text-sm text-text-light">Matches Won</div>
          </div>
          <div class="bg-background-light p-4 rounded-lg text-center">
            <div class="text-3xl font-bold text-primary">156</div>
            <div class="text-sm text-text-light">Total Goals</div>
          </div>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Upcoming Events</h2>
          <button (click)="openChallengeModal()" class="text-primary hover:text-primary-dark text-sm font-medium">
            <i class="fas fa-plus-circle mr-1"></i>New Challenge
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="border-l-4 border-primary pl-4">
            <div class="font-semibold">Team Practice</div>
            <div class="text-sm text-text-light">Feb 3, 2024 • 6:00 PM • Central Arena</div>
          </div>
          <div class="border-l-4 border-yellow-400 pl-4">
            <div class="font-semibold">Strategy Meeting</div>
            <div class="text-sm text-text-light">Feb 5, 2024 • 7:30 PM • Online</div>
          </div>
          <div class="border-l-4 border-green-500 pl-4">
            <div class="font-semibold">Championship Match</div>
            <div class="text-sm text-text-light">Feb 9, 2024 • 5:00 PM • City Stadium</div>
          </div>
        </div>
      </div>

      <!-- Team Members -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Team Members</h2>
          <button (click)="inviteMember()" class="text-primary hover:text-primary-dark text-sm font-medium">
            <i class="fas fa-user-plus mr-1"></i>Invite Member
          </button>
        </div>
        
        <div class="space-y-4">
          @for (member of teamMembers; track member.id) {
            <div class="flex items-center justify-between p-3 bg-background-light rounded-lg hover:shadow-md transition">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {{ getInitials(member.name) }}
                </div>
                <div>
                  <div class="font-semibold">{{ member.name }}</div>
                  <div class="text-xs text-text-light">
                    {{ member.position }} • {{ member.role }}
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="text-sm text-text-light">
                  <span class="font-semibold text-primary">{{ member.matches }}</span> matches
                </div>
                <div class="flex space-x-2">
                  <button (click)="viewMemberStats(member)" class="text-primary hover:text-primary-dark" title="Voir les stats">
                    <i class="fas fa-chart-bar"></i>
                  </button>
                  <button (click)="editMember(member)" class="text-primary hover:text-primary-dark" title="Modifier">
                    <i class="fas fa-edit"></i>
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Active Challenges -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Active Challenges</h2>
        
        @if (challenges.length === 0) {
          <div class="text-center py-8 text-text-light">
            <i class="fas fa-hand-fist text-4xl mb-3 opacity-50"></i>
            <p>Aucun challenge en cours</p>
            <button (click)="openChallengeModal()" class="mt-3 text-primary hover:text-primary-dark">
              Lancer un challenge
            </button>
          </div>
        } @else {
          <div class="space-y-3">
            @for (challenge of challenges; track challenge.id) {
              <div class="border rounded-lg p-4">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="font-semibold">{{ challenge.opponentTeam }}</div>
                    <div class="text-sm text-text-light">
                      {{ challenge.date }} • {{ challenge.time }} • {{ challenge.location }}
                    </div>
                    <div class="text-xs mt-1">
                      <span [class]="getStatusClass(challenge.status)" class="px-2 py-1 rounded-full">
                        {{ getStatusText(challenge.status) }}
                      </span>
                      <span class="ml-2 text-text-light">{{ challenge.type }}</span>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    @if (challenge.status === 'en_attente') {
                      <button (click)="cancelChallenge(challenge)" class="text-red-600 hover:text-red-800 text-sm">
                        Annuler
                      </button>
                    }
                    <button (click)="viewChallengeDetails(challenge)" class="text-primary hover:text-primary-dark">
                      <i class="fas fa-eye"></i>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>

      <!-- Team Settings Modal -->
      @if (showTeamSettingsModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Team Settings</h2>
                <button (click)="showTeamSettingsModal = false" class="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>

              <!-- Tabs dans les settings -->
              <div class="flex space-x-4 border-b mb-6">
                <button (click)="settingsTab = 'general'" [class]="settingsTab === 'general' ? 'text-primary border-b-2 border-primary' : 'text-text-light'" class="px-4 py-2 font-medium">
                  Général
                </button>
                <button (click)="settingsTab = 'members'" [class]="settingsTab === 'members' ? 'text-primary border-b-2 border-primary' : 'text-text-light'" class="px-4 py-2 font-medium">
                  Members
                </button>
                <button (click)="settingsTab = 'roles'" [class]="settingsTab === 'roles' ? 'text-primary border-b-2 border-primary' : 'text-text-light'" class="px-4 py-2 font-medium">
                  Roles
                </button>
                <button (click)="settingsTab = 'notifications'" [class]="settingsTab === 'notifications' ? 'text-primary border-b-2 border-primary' : 'text-text-light'" class="px-4 py-2 font-medium">
                  Notifications
                </button>
              </div>

              <!-- General Settings -->
              @if (settingsTab === 'general') {
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-1">Team Name</label>
                    <input type="text" [(ngModel)]="teamSettings.name" class="w-full border rounded-lg px-4 py-2">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Description</label>
                    <textarea [(ngModel)]="teamSettings.description" rows="3" class="w-full border rounded-lg px-4 py-2"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Team Logo</label>
                    <div class="flex items-center space-x-3">
                      <div class="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center text-primary text-2xl">
                        <i class="fas fa-image"></i>
                      </div>
                      <button class="border rounded-lg px-4 py-2 hover:bg-gray-50">Upload Logo</button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Primary Color</label>
                    <input type="color" [(ngModel)]="teamSettings.primaryColor" class="w-full h-10 rounded-lg">
                  </div>
                </div>
              }

              <!-- Members Settings -->
              @if (settingsTab === 'members') {
                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <h3 class="font-semibold">Manage Members</h3>
                    <button (click)="inviteMember()" class="text-primary hover:text-primary-dark text-sm">
                      <i class="fas fa-user-plus mr-1"></i>Invite New
                    </button>
                  </div>
                  
                  @for (member of teamMembers; track member.id) {
                    <div class="flex items-center justify-between p-3 bg-background-light rounded-lg">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                          {{ getInitials(member.name) }}
                        </div>
                        <div>
                          <div class="font-medium">{{ member.name }}</div>
                          <div class="text-xs text-text-light">{{ member.position }}</div>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <select [(ngModel)]="member.role" class="border rounded px-2 py-1 text-sm">
                          <option value="Membre">Membre</option>
                          <option value="Vice-capitaine">Vice-capitaine</option>
                          <option value="Capitaine">Capitaine</option>
                        </select>
                        <button (click)="removeMember(member)" class="text-red-600 hover:text-red-800">
                          <i class="fas fa-user-minus"></i>
                        </button>
                      </div>
                    </div>
                  }
                </div>
              }

              <!-- Roles Settings -->
              @if (settingsTab === 'roles') {
                <div class="space-y-4">
                  <div class="border rounded-lg p-4">
                    <h4 class="font-semibold mb-2">Capitaine</h4>
                    <p class="text-sm text-text-light mb-3">Peut modifier l'équipe, inviter des membres et lancer des challenges</p>
                    <div class="flex space-x-2">
                      <input type="text" placeholder="Nombre max de capitaines" class="flex-1 border rounded px-3 py-1 text-sm">
                      <button class="bg-primary text-white px-3 py-1 rounded text-sm">Save</button>
                    </div>
                  </div>
                  <div class="border rounded-lg p-4">
                    <h4 class="font-semibold mb-2">Vice-capitaine</h4>
                    <p class="text-sm text-text-light mb-3">Peut gérer les membres et organiser des événements</p>
                  </div>
                  <div class="border rounded-lg p-4">
                    <h4 class="font-semibold mb-2">Membre</h4>
                    <p class="text-sm text-text-light mb-3">Peut participer aux matchs et commenter</p>
                  </div>
                </div>
              }

              <!-- Notifications Settings -->
              @if (settingsTab === 'notifications') {
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">Match Reminders</div>
                      <div class="text-sm text-text-light">Receive notifications before matches</div>
                    </div>
                    <input type="checkbox" [(ngModel)]="teamSettings.notifications.matches" class="toggle">
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">Challenge Requests</div>
                      <div class="text-sm text-text-light">Get notified when someone challenges the team</div>
                    </div>
                    <input type="checkbox" [(ngModel)]="teamSettings.notifications.challenges" class="toggle">
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">New Members</div>
                      <div class="text-sm text-text-light">When someone joins the team</div>
                    </div>
                    <input type="checkbox" [(ngModel)]="teamSettings.notifications.newMembers" class="toggle">
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">Comments</div>
                      <div class="text-sm text-text-light">Replies to your posts</div>
                    </div>
                    <input type="checkbox" [(ngModel)]="teamSettings.notifications.comments" class="toggle">
                  </div>
                </div>
              }

              <!-- Save Button -->
              <div class="flex space-x-3 mt-6">
                <button (click)="saveTeamSettings()" class="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark font-medium">
                  Save Changes
                </button>
                <button (click)="showTeamSettingsModal = false" class="flex-1 border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-medium">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Challenge Modal -->
      @if (showChallengeModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-xl max-w-md w-full">
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">Start a Challenge</h2>
                <button (click)="showChallengeModal = false" class="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Opponent Team</label>
                  <select [(ngModel)]="newChallenge.opponentTeam" class="w-full border rounded-lg px-4 py-2">
                    <option value="">Select a team...</option>
                    @for (team of availableTeams; track team) {
                      <option [value]="team">{{ team }}</option>
                    }
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Challenge Type</label>
                  <select [(ngModel)]="newChallenge.type" class="w-full border rounded-lg px-4 py-2">
                    <option value="amical">Match amical</option>
                    <option value="championnat">Match de championnat</option>
                    <option value="tournoi">Tournoi</option>
                  </select>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium mb-1">Date</label>
                    <input type="date" [(ngModel)]="newChallenge.date" class="w-full border rounded-lg px-4 py-2">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Time</label>
                    <input type="time" [(ngModel)]="newChallenge.time" class="w-full border rounded-lg px-4 py-2">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Location</label>
                  <input type="text" [(ngModel)]="newChallenge.location" placeholder="Stadium name" class="w-full border rounded-lg px-4 py-2">
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Message (optional)</label>
                  <textarea [(ngModel)]="newChallenge.message" rows="3" class="w-full border rounded-lg px-4 py-2" placeholder="Add a message to the opponent..."></textarea>
                </div>

                <div class="flex space-x-3 pt-4">
                  <button (click)="sendChallenge()" [disabled]="!newChallenge.opponentTeam || !newChallenge.date || !newChallenge.time" class="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark disabled:opacity-50 font-medium">
                    Send Challenge
                  </button>
                  <button (click)="showChallengeModal = false" class="flex-1 border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-medium">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Member Stats Modal -->
      @if (showMemberStatsModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-xl max-w-2xl w-full">
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">{{ selectedMember?.name }} - Statistics</h2>
                <button (click)="showMemberStatsModal = false" class="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>

              @if (selectedMember) {
                <div class="grid grid-cols-3 gap-4 mb-6">
                  <div class="bg-primary/10 p-4 rounded-lg text-center">
                    <div class="text-3xl font-bold text-primary">{{ selectedMember.matches }}</div>
                    <div class="text-sm text-text-light">Matches</div>
                  </div>
                  <div class="bg-primary/10 p-4 rounded-lg text-center">
                    <div class="text-3xl font-bold text-primary">{{ selectedMember.goals }}</div>
                    <div class="text-sm text-text-light">Goals</div>
                  </div>
                  <div class="bg-primary/10 p-4 rounded-lg text-center">
                    <div class="text-3xl font-bold text-primary">{{ selectedMember.assists }}</div>
                    <div class="text-sm text-text-light">Assists</div>
                  </div>
                </div>

                <div class="space-y-3">
                  <h3 class="font-semibold">Recent Performance</h3>
                  <div class="h-40 bg-background-light rounded-lg flex items-center justify-center text-text-light">
                    Chart would go here
                  </div>
                </div>
              }
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
export class TeamDetailComponent {
  // Team members
  teamMembers: TeamMember[] = [
    { id: 1, name: 'Alex Rivera', position: 'Forward', role: 'Capitaine', matches: 45, goals: 32, assists: 18 },
    { id: 2, name: 'Morgan Lee', position: 'Midfielder', role: 'Vice-capitaine', matches: 43, goals: 15, assists: 28 },
    { id: 3, name: 'Jordan Chen', position: 'Defender', role: 'Membre', matches: 40, goals: 5, assists: 12 },
    { id: 4, name: 'Taylor Brooks', position: 'Midfielder', role: 'Membre', matches: 38, goals: 20, assists: 13 },
    { id: 5, name: 'Casey Kim', position: 'Goalkeeper', role: 'Membre', matches: 42, goals: 0, assists: 8 },
    { id: 6, name: 'Sam Taylor', position: 'Forward', role: 'Membre', matches: 35, goals: 28, assists: 10 }
  ];

  // Available teams for challenge
  availableTeams: string[] = [
    'Urban Legends',
    'Street Warriors',
    'Fire Dragons',
    'Night Hawks',
    'Storm Chasers',
    'Thunder FC'
  ];

  // Challenges
  challenges: Challenge[] = [
    {
      id: 1,
      opponentTeam: 'Urban Legends',
      type: 'amical',
      date: '2024-02-10',
      time: '19:00',
      location: 'Central Arena',
      status: 'en_attente',
      message: 'Prêts pour un match amical ?'
    }
  ];

  // Modal states
  showTeamSettingsModal = false;
  showChallengeModal = false;
  showMemberStatsModal = false;
  showSuccessMessage = false;
  successMessage = '';

  // Selected member for stats
  selectedMember: TeamMember | null = null;

  // Settings tab
  settingsTab: 'general' | 'members' | 'roles' | 'notifications' = 'general';

  // Team settings form
  teamSettings = {
    name: 'Thunder Strikers',
    description: 'Équipe de football passionnée',
    primaryColor: '#4f46e5',
    notifications: {
      matches: true,
      challenges: true,
      newMembers: true,
      comments: false
    }
  };

  // New challenge form
  newChallenge = {
    opponentTeam: '',
    type: 'amical' as 'amical' | 'championnat' | 'tournoi',
    date: '',
    time: '',
    location: '',
    message: ''
  };

  // Methods
  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'accepté': return 'bg-green-100 text-green-800';
      case 'refusé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'en_attente': return 'En attente';
      case 'accepté': return 'Accepté';
      case 'refusé': return 'Refusé';
      default: return status;
    }
  }

  // Team Settings
  openTeamSettings() {
    this.showTeamSettingsModal = true;
    this.showMessage('Team Settings opened');
  }

  saveTeamSettings() {
    this.showMessage('Team settings saved successfully');
    this.showTeamSettingsModal = false;
  }

  // Member Management
  inviteMember() {
    this.showMessage('Invitation link copied to clipboard');
  }

  editMember(member: TeamMember) {
    this.showMessage(`Editing ${member.name}`);
  }

  removeMember(member: TeamMember) {
    if (confirm(`Remove ${member.name} from team?`)) {
      this.teamMembers = this.teamMembers.filter(m => m.id !== member.id);
      this.showMessage(`${member.name} removed from team`);
    }
  }

  viewMemberStats(member: TeamMember) {
    this.selectedMember = member;
    this.showMemberStatsModal = true;
  }

  // Challenge Management
  openChallengeModal() {
    this.newChallenge = {
      opponentTeam: '',
      type: 'amical',
      date: '',
      time: '',
      location: '',
      message: ''
    };
    this.showChallengeModal = true;
  }

  sendChallenge() {
    if (this.newChallenge.opponentTeam && this.newChallenge.date && this.newChallenge.time) {
      const challenge: Challenge = {
        id: this.challenges.length + 1,
        opponentTeam: this.newChallenge.opponentTeam,
        type: this.newChallenge.type,
        date: this.newChallenge.date,
        time: this.newChallenge.time,
        location: this.newChallenge.location,
        message: this.newChallenge.message,
        status: 'en_attente'
      };
      this.challenges.push(challenge);
      this.showMessage(`Challenge sent to ${this.newChallenge.opponentTeam}`);
      this.showChallengeModal = false;
    }
  }

  cancelChallenge(challenge: Challenge) {
    if (confirm('Cancel this challenge?')) {
      this.challenges = this.challenges.filter(c => c.id !== challenge.id);
      this.showMessage('Challenge cancelled');
    }
  }

  viewChallengeDetails(challenge: Challenge) {
    this.showMessage(`Challenge vs ${challenge.opponentTeam}`);
  }

  // Utility
  private showMessage(msg: string) {
    this.successMessage = msg;
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
  }
}
