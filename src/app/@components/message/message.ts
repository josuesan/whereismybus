import { Component, Input } from '@angular/core';
import { AuthService, CTAService, NotificationService } from "../../@services";
import { User, Notification } from "../../#interfaces";

@Component({
  selector: 'app-message',
  templateUrl: 'message.html',
  styleUrls: ['message.scss'],
})
export class MessageComponent {

  public driver = {} as User;
  public messages: any[];
  public message = {} as Notification;

  constructor(private cta: CTAService, private authService: AuthService, private messageService: NotificationService) { }

  ngOnInit() {
    var currentUser = this.authService.getCurrentUser();
    if (currentUser != null) {
      this.messages = [];
      this.messageService.getObsMessages().subscribe((data) => {
        
        data.forEach((doc) => {
          this.message = doc.payload.doc.data() as Notification;
          this.authService.getUserData(this.message.driver).then((docUser) => {
            if (docUser.exists) {
              this.driver = docUser.data() as User;
              this.messages.push({driver: this.driver, data:this.message});
            }
            // else this.cta.goToHome();
          });
        })


      });

    } else this.cta.goToLogin();
  }

  
}
