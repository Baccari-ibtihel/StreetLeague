import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'player' | 'owner' | 'admin';
  avatar?: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  stats: {
    matches: number;
    wins: number;
    points: number;
    winRate: number;
    winStreak: number;
    leagueRank: number;
  };
  team?: {
    id: string;
    name: string;
    position: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();

  constructor(private router: Router) {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSignal.set(JSON.parse(savedUser));
    } else {
      // Pour le développement, créer un utilisateur de test
      this.setTestUser();
    }
  }

  private setTestUser() {
    const testUser: User = {
      id: '1',
      name: 'Jordan Smith',
      email: 'jordan.smith@example.com',
      role: 'player',
      level: 12,
      xp: 2480,
      nextLevelXp: 3000,
      stats: {
        matches: 156,
        wins: 89,
        points: 32,
        winRate: 72,
        winStreak: 5,
        leagueRank: 3
      },
      team: {
        id: 'team1',
        name: 'ThunderStrikers',
        position: 'Forward'
      }
    };
    this.currentUserSignal.set(testUser);
    localStorage.setItem('currentUser', JSON.stringify(testUser));
  }

  getUserName(): string {
    return this.currentUser()?.name || 'Jordan Smith';
  }

  getUserFirstName(): string {
    const name = this.currentUser()?.name;
    if (name) {
      return name.split(' ')[0] || 'Jordan';
    }
    return 'Jordan';
  }

  getUserInitial(): string {
    return this.currentUser()?.name?.charAt(0) || 'J';
  }

  getUserLevel(): number {
    return this.currentUser()?.level || 12;
  }

  getUserXp(): number {
    return this.currentUser()?.xp || 2480;
  }

  getUserNextLevelXp(): number {
    return this.currentUser()?.nextLevelXp || 3000;
  }

  getUserStats() {
    return this.currentUser()?.stats || {
      matches: 156,
      wins: 89,
      points: 32,
      winRate: 72,
      winStreak: 5,
      leagueRank: 3
    };
  }

  getTeamName(): string {
    return this.currentUser()?.team?.name || 'ThunderStrikers';
  }

  login(email: string, password: string): boolean {
    // Simulation de connexion
    const user: User = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      role: 'player',
      level: 12,
      xp: 2480,
      nextLevelXp: 3000,
      stats: {
        matches: 156,
        wins: 89,
        points: 32,
        winRate: 72,
        winStreak: 5,
        leagueRank: 3
      },
      team: {
        id: 'team1',
        name: 'ThunderStrikers',
        position: 'Forward'
      }
    };
    this.currentUserSignal.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['/dashboard']);
    return true;
  }

  register(userData: any): boolean {
    const user: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      level: 1,
      xp: 0,
      nextLevelXp: 1000,
      stats: {
        matches: 0,
        wins: 0,
        points: 0,
        winRate: 0,
        winStreak: 0,
        leagueRank: 0
      }
    };
    this.currentUserSignal.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['/dashboard']);
    return true;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
