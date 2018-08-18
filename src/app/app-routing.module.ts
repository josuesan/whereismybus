import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './@pages/login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './@pages/profile/profile.module#ProfilePageModule' },
  { path: 'messages', loadChildren: './@pages/messages/messages.module#MessagesPageModule' },
  { path: 'statestudent', loadChildren: './@pages/stateStudent/stateStudent.module#StateStudentPageModule' },
  { path: 'representative', loadChildren: './@pages/representative/representative.module#RepresentativePageModule' },
  { path: 'driver', loadChildren: './@pages/driver/driver.module#DriverPageModule' },
  { path: 'home', loadChildren: './@pages/home/home.module#HomePageModule' },
  { path: 'state', loadChildren: './@pages/state/state.module#StatePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
