import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard';
import { NavbarComponent } from './navbar';
import { MessageComponent } from './message';
import { StateComponent } from './state';
import { RegisterPlaceComponent } from './register-place';


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
    StateComponent,
    RegisterPlaceComponent
  ],
  entryComponents: [
    DashboardComponent,
    NavbarComponent,
    MessageComponent,
    StateComponent,
    RegisterPlaceComponent
  ],
  exports:[
    DashboardComponent,
    NavbarComponent,
    MessageComponent,
    StateComponent,
    RegisterPlaceComponent
  ]
})
export class ComponentsModule {}
