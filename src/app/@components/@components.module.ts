import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard';
import { NavbarComponent } from './navbar';
import { MessageComponent } from './message';
import { StateComponent } from './state';
import { RegisterPlaceComponent } from './register-place';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDqJPSrH2lvMMqt6yZMmpf9z8Pws0hyJd8'
    })
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
