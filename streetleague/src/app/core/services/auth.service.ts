import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = {
    id: '1',
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    role: 'player'
  };

  constructor(private router: Router) {}

  get currentUser(): User | null {
    return this.user;
  }

  login(email: string, password: string): boolean {
    this.user = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      role: 'player'
    };
    this.router.navigate(['/dashboard']);
    return true;
  }

  register(userData: any): boolean {
    this.user = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role
    };
    this.router.navigate(['/dashboard']);
    return true;
  }

  logout(): void {
    this.user = null;
    this.router.navigate(['/']);
  }
}
