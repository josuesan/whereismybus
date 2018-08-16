import { Component } from '@angular/core';

@Component({
  selector: 'app-driver',
  templateUrl: 'driver.page.html',
  styleUrls: ['driver.page.scss'],
})
export class DriverPage {
    public userType:string = "admin";
    
    constructor(){
        console.log("holña");
    }


}
