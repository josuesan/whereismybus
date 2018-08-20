import { Component, Input } from '@angular/core';
import { GeolocationService } from '../../@services';
declare const L;

@Component({
  selector: 'app-map',
  templateUrl: 'map.html',
  styleUrls: ['map.scss'],
})
export class MapComponent {
    private latInitial = Number("10.500000");
    private lngInitial  = Number("-66.916664");
    private myMap;
    constructor(private geolocationService:GeolocationService){

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

        setTimeout(() => {
            map.invalidateSize();
            console.log("invalidate");
          }, 1000);
        this.geolocationService.todo();
    }

}
