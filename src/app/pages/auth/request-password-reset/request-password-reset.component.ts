import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrl: './request-password-reset.component.scss'
})
export class RequestPasswordResetComponent {
  requestPasswordForm: FormGroup;
  message: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.requestPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.requestPasswordForm.valid) {
      const email = this.requestPasswordForm.get('email')?.value;
      this.authService.requestPasswordReset(email).subscribe(
        () => {
          this.message = 'Password reset email sent. Please check your email.';
        },
        error => {
          console.error('Password reset failed', error);
          this.message = 'Password reset failed. Please try again.';
        }
      );
    }
  }
}
