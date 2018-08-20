import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard';
import { NavbarComponent } from './navbar';
import { MessageComponent } from './message';
import { StateComponent } from './state';
import { RegisterPlaceComponent } from './register-place';
import { MapComponent } from './map';

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
    RegisterPlaceComponent,
    MapComponent
  ],
  entryComponents: [
    DashboardComponent,
    NavbarComponent,
    MessageComponent,
    StateComponent,
    RegisterPlaceComponent,
    MapComponent
  ],
  exports:[
    DashboardComponent,
    NavbarComponent,
    MessageComponent,
    StateComponent,
    RegisterPlaceComponent,
    MapComponent
  ]
})
export class ComponentsModule {}
