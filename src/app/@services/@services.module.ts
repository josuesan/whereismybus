import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { StudentsService } from './students.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    StudentsService,
    AuthService,
    
  ]
})
export class ServicesModule { }
