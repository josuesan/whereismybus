import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeolocationService } from '../../@services';
declare const L;

@Component({
  selector: 'app-register-place',
  templateUrl: 'register-place.html',
  styleUrls: ['register-place.scss'],
})
export class RegisterPlaceComponent {
    private latInitial = Number("10.500000");
    private lngInitial  = Number("-66.916664");
    private myMap;
    constructor(private geolocationService:GeolocationService,private modalController: ModalController){

    }
    ngOnInit() {
        const map = L.map('map',{
            center: [this.latInitial, this.lngInitial],
            zoom: 13,
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        this.geolocationService.createMap(map);
        this.geolocationService.bindEventsMap();
  
    }
    saveDataMap(){
        if (this.geolocationService.saveDataMap()){
            console.log("entre");
            this.modalController.dismiss();
        }
    }

    saveActualLocation(){
        if (this.geolocationService.saveActualLocation()){
            this.modalController.dismiss();
        }
    }
}