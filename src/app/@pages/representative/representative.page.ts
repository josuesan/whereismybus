import { Component } from '@angular/core';

@Component({
  selector: 'app-representative',
  templateUrl: 'representative.page.html',
  styleUrls: ['representative.page.scss'],
})
export class RepresentativePage {
    public userType:string = "admin";
    
    constructor(){
        console.log("holña");
    }


}
