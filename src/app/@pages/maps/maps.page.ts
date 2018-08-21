import { Component } from '@angular/core';
import { GeolocationService, CTAService } from '../../@services';
@Component({
  selector: 'app-maps',
  templateUrl: 'maps.page.html',
  styleUrls: ['maps.page.scss'],
})
export class MapsPage {
    public time:number = 5;
    public distance:number =10;
  constructor(private geolocationService:GeolocationService, private cta:CTAService) { }

  ngOnInit(){
    this.geolocationService.obsDistanceToArrive.subscribe( res => this.distance = res);
    this.geolocationService.obsTimeToArrive.subscribe( res => this.time = res);
  }
  goHome() {
    this.cta.goToHome();
}

}
