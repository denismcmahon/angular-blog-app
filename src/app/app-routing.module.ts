import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'add-post', component: AddPostComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
