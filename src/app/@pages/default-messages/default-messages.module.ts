import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DefaultMessagesPage } from './default-messages.page';
import { ServicesModule } from '../../@services';
/**
 * Local imports
 */
import { ComponentsModule } from '../../@components';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DefaultMessagesPage
      }
    ]),
    ServicesModule
  ],
  declarations: [DefaultMessagesPage]
})
export class DefaultMessagesPageModule {}
