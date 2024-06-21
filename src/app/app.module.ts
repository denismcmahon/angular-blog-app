import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { QuillModule } from 'ngx-quill';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserAdminComponent } from './components/admin/useradmin/useradmin.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserFormComponent } from './components/admin/userform/userform.component';
import { SetPasswordComponent } from './components/auth/set-password/set-password.component';

import { AuthInterceptor } from './interceptors/auth/auth-interceptor.service';
import { RequestPasswordResetComponent } from './components/auth/request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AddPostComponent,
    NavbarComponent,
    UserAdminComponent,
    LoginComponent,
    UserFormComponent,
    SetPasswordComponent,
    RequestPasswordResetComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
