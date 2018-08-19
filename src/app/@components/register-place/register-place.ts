import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-register-place',
  templateUrl: 'register-place.html',
  styleUrls: ['register-place.scss'],
})
export class RegisterPlaceComponent {

    constructor(private modalController: ModalController){

    }
    ngOnInit() {
        
    }
    close(){
        this.modalController.dismiss();
    }
    

}