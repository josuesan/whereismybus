import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './@pages/login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './@pages/profile/profile.module#ProfilePageModule' },
  { path: 'messages', loadChildren: './@pages/messages/messages.module#MessagesPageModule' },
  { path: 'statestudent', loadChildren: './@pages/stateStudent/stateStudent.module#StateStudentPageModule' },
  { path: 'representative', loadChildren: './@pages/representaive/representaive.module#RepresentativePageModule' },
  { path: 'driver', loadChildren: './@pages/driver/driver.module#DriverPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
