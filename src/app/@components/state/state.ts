import { Component, Input } from '@angular/core';
import { AuthService, StudentsService } from "../../@services";
import { Router } from '@angular/router';

@Component({
  selector: 'app-state',
  templateUrl: 'state.html',
  styleUrls: ['state.scss'],
})
export class StateComponent {

  @Input("userType") public type: string = " ";
  @Input("students") public students: any = [];

  constructor(private authService: AuthService, private router: Router, private studentService: StudentsService) { }

  ngOnInit() { }

  public onChangeStatus(id: string, state: string) {
    let currentUser = this.authService.getCurrentUser();
    
    if (currentUser != null) {
      this.studentService.changeStateStudent(id, state).then(() => { })
        .catch(err => console.error(err));

    } else this.router.navigate(['/login']);
  }

  customActionSheetOptions: any = {
    /*header: 'Colors',
    subHeader: 'Select your favorite color'*/
  };
  customPopoverOptions: any = {
    /* header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'*/
  };
}