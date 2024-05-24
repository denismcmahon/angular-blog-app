import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

interface User {
  id: string;
  username: string;
  role: string;
}

@Component({
  selector: 'app-useradmin',
  templateUrl: './useradmin.component.html'
})
export class UserAdminComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(user: any) {
    this.router.navigate(['/admin/edit-user', user.id]);
  }
}
