import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  username = '';
  role = 'user';

  constructor(private http: HttpClient) {}

  assignRole() {
    this.http.post('http://localhost:3000/api/admin/assign-role', { username: this.username, role: this.role })
      .subscribe(response => {
        console.log('Role assigned', response);
      }, error => {
        console.error('Error assigning role', error);
      });
  }
}
