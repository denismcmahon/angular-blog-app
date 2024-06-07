import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { QuillModule } from 'ngx-quill';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserAdminComponent } from './components/admin/useradmin/useradmin.component';
import { LoginComponent } from './components/login/login.component';
import { AdduserComponent } from './components/admin/adduser/adduser.component';

import { AuthInterceptor } from './interceptors/auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AddPostComponent,
    NavbarComponent,
    UserAdminComponent,
    LoginComponent,
    AdduserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule
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
