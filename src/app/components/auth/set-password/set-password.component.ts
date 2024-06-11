import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
  ) { }

  ngOnInit(): void {
      this.token = this.route.snapshot.paramMap.get('token') || '';
      this.setPasswordForm = this.fb.group({
        password: ['', Validators.required, Validators.minLength(6)],
        confirmPassword: ['', Validators.required]
      }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    if (this.setPasswordForm.valid) {
      const  password  = this.setPasswordForm.get('password')?.value;
      this.http.post('/api/set-password', { token: this.token, password }).subscribe(
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


