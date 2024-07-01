// reset-password.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = null;
  message: string | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private authService: AuthService) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.token) {
      const password = this.resetPasswordForm.get('password')?.value;
      this.authService.resetPassword(this.token, password).subscribe(
        () => {
          this.message = 'Password has been reset';
        },
        error => {
          this.message = 'An error occurred';
        }
      );
    }
  }
}
