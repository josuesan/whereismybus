import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { StudentsService } from './students.service';
import { GeolocationService } from './geolocation.service';
import { NotificationService } from './notification.service';
import { CTAService } from './cta.service';
import { ApiService } from './api.service';
import { ImageService } from './image.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    StudentsService,
    AuthService,
    ApiService,
    GeolocationService,
    NotificationService,
    CTAService ,
    ImageService  
  ]
})
export class ServicesModule { }
