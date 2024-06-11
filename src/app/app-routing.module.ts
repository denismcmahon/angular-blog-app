import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { UserAdminComponent } from './components/admin/useradmin/useradmin.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SetPasswordComponent } from './components/auth/set-password/set-password.component';
import { AdduserComponent } from './components/admin/adduser/adduser.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'add-post', component: AddPostComponent, canActivate: [authGuard] },
  { path: 'admin/home', component: UserAdminComponent, canActivate: [adminGuard] },
  { path: 'admin/add-user', component: AdduserComponent, canActivate: [adminGuard] },
  { path: 'set-password/:token', component: SetPasswordComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
