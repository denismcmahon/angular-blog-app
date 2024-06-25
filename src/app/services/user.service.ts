import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any[]>('/api/admin/users');
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>('/api/admin/user/${id}');
  }

  addUser(userData: any) {
    return this.http.post('/api/admin/add-user', userData);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put<any>('/api/admin/edit-user/${id}', user);
  }
}
