// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string | null = null;

  constructor(private router: Router) {}

  login(token: string) {
    const decodedToken = jwtDecode<{ role: string }>(token);
    this.userRole = decodedToken.role;
    localStorage.setItem('userRole', decodedToken.role);
    localStorage.setItem('token', token);
  }

  logout() {
    this.userRole = null;
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getRole(): string | null {
    if (!this.userRole) {
      this.userRole = localStorage.getItem('userRole');
    }
    return this.userRole;
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }
}
