import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent {
  addUserForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router
  ) {
    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.addUserForm.valid) {
      this.userService.addUser(this.addUserForm.value).subscribe({
        next: (response) => {
          console.log('User added and email sent', response);
          this.router.navigate(['/admin/users']);
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while creating the user. Please try again.';
          console.error('Error creating user:', error); // Log the error for debugging purposes
        }
      });
    }
  }

}
