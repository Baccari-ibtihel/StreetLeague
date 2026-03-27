import { Injectable, signal } from '@angular/core';

export interface PlayerStats {
  playerId: string;
  playerName: string;
  goals: number;
  assists: number;
  fouls: number;
  yellowCards: number;
  redCards: boolean;
  minutesPlayed: number;
  rating?: number;
}

export interface MatchResult {
  id: string;
  matchId: string;
  opponent: string;
  date: Date;
  ourScore: number;
  theirScore: number;
  outcome: 'win' | 'loss' | 'draw';
  playerStats: PlayerStats[];
  completedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private successMessageSignal = signal<string>('');
  successMessage = this.successMessageSignal.asReadonly();

  private errorMessageSignal = signal<string>('');
  errorMessage = this.errorMessageSignal.asReadonly();

  private loadingSignal = signal<boolean>(false);
  loading = this.loadingSignal.asReadonly();

  private matchResultsSignal = signal<MatchResult[]>([]);
  matchResults = this.matchResultsSignal.asReadonly();

  showSuccess(message: string): void {
    this.successMessageSignal.set(message);
    setTimeout(() => this.clearMessages(), 3000);
  }

  showError(message: string): void {
    this.errorMessageSignal.set(message);
    setTimeout(() => this.clearMessages(), 3000);
  }

  clearMessages(): void {
    this.successMessageSignal.set('');
    this.errorMessageSignal.set('');
  }

  applySponsorCode(code: string): void {
    this.loadingSignal.set(true);
    setTimeout(() => {
      this.showSuccess(`Code ${code} appliqué avec succès !`);
      this.loadingSignal.set(false);
    }, 500);
  }

  bookFacility(facilityId: string, date: Date, time: string): Promise<boolean> {
    this.loadingSignal.set(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        this.showSuccess('Réservation effectuée avec succès !');
        this.loadingSignal.set(false);
        resolve(true);
      }, 1000);
    });
  }

  scheduleMatch(opponent: string, type: string, date: Date, time: string, location: string): Promise<boolean> {
    this.loadingSignal.set(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        this.showSuccess('Match programmé avec succès !');
        this.loadingSignal.set(false);
        resolve(true);
      }, 1000);
    });
  }

  joinMatch(matchId: string): Promise<boolean> {
    this.loadingSignal.set(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        this.showSuccess('Vous avez rejoint le match !');
        this.loadingSignal.set(false);
        resolve(true);
      }, 500);
    });
  }

  saveMatchResult(result: Omit<MatchResult, 'id' | 'completedAt'>): Promise<MatchResult> {
    this.loadingSignal.set(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newResult: MatchResult = {
          ...result,
          id: Date.now().toString(),
          completedAt: new Date()
        };
        
        const currentResults = this.matchResultsSignal();
        this.matchResultsSignal.set([...currentResults, newResult]);
        
        this.showSuccess('Résultats du match enregistrés !');
        this.loadingSignal.set(false);
        resolve(newResult);
      }, 800);
    });
  }

  calculatePlayerRating(stats: PlayerStats): number {
    let rating = 6.0;
    rating += stats.goals * 0.5;
    rating += stats.assists * 0.3;
    rating -= stats.fouls * 0.1;
    rating -= stats.yellowCards * 0.3;
    if (stats.redCards) rating -= 1.5;
    if (stats.minutesPlayed > 60) rating += 0.2;
    return Math.min(10, Math.max(1, Math.round(rating * 10) / 10));
  }
}
