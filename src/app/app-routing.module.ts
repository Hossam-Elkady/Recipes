import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { LogedGuard } from './shared/loged.guard';
import { StaredComponent } from './stared/stared.component';

const routes: Routes = [
  { path: "", redirectTo: "home/pizza", pathMatch: "full" },
  // { path: "", redirectTo: "category", pathMatch: "full" },
  { path: "stared", component: StaredComponent, canActivate: [AuthGuard] },
  { path: "details/:id", component: DetailsComponent },
  { path: "home/:category", component: HomeComponent },
  { path: "register", component: RegisterComponent, canActivate: [LogedGuard] },
  { path: "login", component: LoginComponent, canActivate: [LogedGuard] },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
