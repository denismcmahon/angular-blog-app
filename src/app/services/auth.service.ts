// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    console.log('DM ==> username and password: ', username, password);
    return this.http.post<{ token: string }>('http://localhost:3000/api/auth/login', { username, password });
  }

  handleLogin(token: string) {
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

  isSuperAdmin(): boolean {
    return this.getRole() === 'superAdmin';
  }
}
