import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TrackerPage } from './tracker.page';
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
        component: TrackerPage
      }
    ]),
    ServicesModule,
  ],
  declarations: [TrackerPage]
})
export class TrackerPageModule {}

