import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { MainComponent } from './main/main.component';
import { RankComponent } from './rank/rank.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'sign_up', component: SignUpComponent },
  { path: 'rank', component: RankComponent, canActivate: [AuthGuard]},
  { path: '**', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
