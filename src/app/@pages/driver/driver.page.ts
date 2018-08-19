import { Component } from '@angular/core';
import { AuthService, CTAService } from "../../@services";
@Component({
  selector: 'app-driver',
  templateUrl: 'driver.page.html',
  styleUrls: ['driver.page.scss'],
})
export class DriverPage {
    public userType:string = "admin";
    
    constructor(private cta:CTAService){ }

    goHome(){
        this.cta.goToHome();
    }
}
