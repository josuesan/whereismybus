import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-state',
  templateUrl: 'state.html',
  styleUrls: ['state.scss'],
})
export class StateComponent {

    public status: string = "";
    @Input("userType") public type:string = " ";

    constructor(){
    }
    ngOnInit() {
		console.log(this.type);
	}

    customActionSheetOptions: any = {
        header: 'Colors',
        subHeader: 'Select your favorite color'
      };
      customPopoverOptions: any = {
        header: 'Hair Color',
        subHeader: 'Select your hair color',
        message: 'Only select your dominant hair color'
      };
}