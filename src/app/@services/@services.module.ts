import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { StudentsService } from './students.service';
import { GeolocationService } from './geolocation.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    StudentsService,
    AuthService,
    GeolocationService
    
  ]
})
export class ServicesModule { }
