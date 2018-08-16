import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.html',
  styleUrls: ['navbar.scss'],
})
export class NavbarComponent {

    @Input("userType") public type:string = " ";

    constructor(){
        console.log(this.type);
    }
    ngOnInit() {
		console.log(this.type);
	}


}