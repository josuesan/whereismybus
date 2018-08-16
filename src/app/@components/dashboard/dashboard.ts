import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.scss'],
})
export class DashboardComponent {

    @Input("userType") public type:string = "";

    constructor(){

    }
    ngOnInit() {

	}


}
