import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { passwordMatchValidator } from '../../../validators/password-match.validator';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent implements OnInit {
  setPasswordForm: FormGroup;
  token: string;
  message: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    this.setPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.setPasswordForm.valid) {
      const  password  = this.setPasswordForm.get('password')?.value;
      console.log('Submitting form: ', password, this.token);
      this.authService.setPassword(this.token, password).subscribe(
        response => {
          this.message = 'Password set successfully. You can now login.';
        },
        error => {
          console.error('Password set failed', error);
          this.message = 'Password set failed. Please try again.';
        }
      );
    }
  }
}


