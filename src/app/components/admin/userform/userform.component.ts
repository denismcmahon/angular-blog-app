import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserFormComponent implements OnInit {
  addUserForm: FormGroup;
  errorMessage: string | null = null;
  isEditMode: boolean = false;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get the userId from the route parameters if it exists
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.userId;

    // If in edit mode, fetch the user data and populate the form
    if (this.isEditMode) {
      this.userService.getUserById(this.userId!).subscribe(user => {
        console.log('User data:', user);
        this.addUserForm.patchValue({
          email: user.username,
          role: user.role
        });
      }, error => {
        this.errorMessage = 'An error occurred while fetching the user data. Please try again.';
        console.error('Error fetching user data:', error);
      });
    }
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      if (this.isEditMode) {
        this.userService.updateUser(this.userId!, this.addUserForm.value).subscribe({
          next: (response) => {
            console.log('User updated successfully', response);
            this.router.navigate(['/admin/users']);
          },
          error: (error) => {
            this.errorMessage = 'An error occurred while updating the user. Please try again.';
            console.error('Error updating user:', error);
          }
        });
      } else {
        this.userService.addUser(this.addUserForm.value).subscribe({
          next: (response) => {
            console.log('User added successfully', response);
            this.router.navigate(['/admin/users']);
          },
          error: (error) => {
            this.errorMessage = 'An error occurred while creating the user. Please try again.';
            console.error('Error creating user:', error);
          }
        });
      }
    }
  }
}
