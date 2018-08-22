import { Component, Input } from '@angular/core';
import { AuthService, StudentsService, NotificationService, CTAService } from "../../@services";

@Component({
  selector: 'app-state',
  templateUrl: 'state.html',
  styleUrls: ['state.scss'],
})
export class StateComponent {

  @Input("userType") public type: string = " ";
  @Input("students") public students: any = [];

  constructor(private cta: CTAService, private authService: AuthService, private studentService: StudentsService, private notificationService:NotificationService) { }

  ngOnInit() { }

  public onChangeStatus(id: string, state: string) {
    let currentUser = this.authService.getCurrentUser();
    
    if (currentUser != null) {
      this.studentService.changeStateStudent(id, state).then(() => { })
        .catch(err => this.notificationService.createTosty(err.message, false));

    } else this.cta.goToLogin();
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