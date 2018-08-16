import { Component } from '@angular/core';

@Component({
  selector: 'app-stateStudent',
  templateUrl: 'stateStudent.page.html',
  styleUrls: ['stateStudent.page.scss'],
})
export class StateStudentPage {
    public userType:string = "admin";
    
    constructor(){
        console.log("holña");
    }


}
