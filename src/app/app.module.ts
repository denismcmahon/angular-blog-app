import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AddPostComponent } from './pages/blog/add-post/add-post.component';
import { QuillModule } from 'ngx-quill';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserAdminComponent } from './pages/admin/useradmin/useradmin.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { UserFormComponent } from './pages/admin/userform/userform.component';
import { SetPasswordComponent } from './pages/auth/set-password/set-password.component';

import { AuthInterceptor } from './interceptors/auth/auth-interceptor.service';
import { RequestPasswordResetComponent } from './pages/auth/request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';

import { ToastrModule } from 'ngx-toastr';
import { BlogPostPreviewComponent } from './components/blog/landing-blog-post/blog-post-preview.component';
import { TruncatePipe } from './pipes/truncate.pipe';


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
    ResetPasswordComponent,
    BlogPostPreviewComponent,
    TruncatePipe
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
