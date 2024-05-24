import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/admin/users`);
  }

  addUser(userData: any) {
    return this.http.post(`${this.apiUrl}/admin/add_user`, userData);
  }
}
