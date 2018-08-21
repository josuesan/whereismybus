import { Component } from '@angular/core';
import { CTAService, AuthService, NotificationService } from '../../@services';
import { Notification } from "../../#interfaces";

@Component({
  selector: 'app-messages',
  templateUrl: 'messages.page.html',
  styleUrls: ['messages.page.scss'],
})
export class MessagesPage {
  public userType: string = "";
  public message = {} as Notification;

  constructor(private cta: CTAService, private authService: AuthService, private messageService: NotificationService) { }

  ngOnInit() {
    this.verifyRole();
  }

  async verifyRole() {
    let currentUser = await this.authService.getCurrentUser();
    if (currentUser != null) {
      this.authService.getUserData(currentUser.uid).then((doc) => {
        if (doc.exists) this.userType = doc.data().role;
        else this.cta.goToHome();
      }).catch((err) => console.error(err));
    }
    else this.cta.goToLogin();
  }

  async saveNewMessage() {
    let currentUser = await this.authService.getCurrentUser();
    if (currentUser != null) {
      this.message.driver = currentUser.uid;
      this.messageService.addNewMessage(this.message).then((docRef) => {
        console.log("Mensaje agregado");
      });
    } 
    else this.cta.goToLogin();
  }

   cleanHistory(){
     let response = this.messageService.cleanHistory().toPromise();
     console.log(response);
      
  }


  goHome() {
    this.cta.goToHome();
  }
}
