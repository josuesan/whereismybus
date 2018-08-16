import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard';
import { NavbarComponent } from './navbar';
import { MessageComponent } from './message';
import { StateComponent } from './state';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    NavbarComponent,
    MessageComponent,
    StateComponent
  ],
  entryComponents: [
    DashboardComponent,
    NavbarComponent,
    MessageComponent,
    StateComponent
  ],
  exports:[
    DashboardComponent,
    NavbarComponent,
    MessageComponent,
    StateComponent
  ]
})
export class ComponentsModule {}
