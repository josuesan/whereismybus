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
      
      this.messageService.getObsMessages().subscribe((data) => {
        this.messages = [];
        data.forEach((doc) => {
          var message = doc.payload.doc.data() as Notification;
          this.authService.getUserData(message.driver).then((docUser) => {
            if (docUser.exists) {
              var driver = docUser.data() as User;
              this.messages.push({driver: driver, data: message});
            }

          });
        });
        console.log(this.messages);


      });

    } else this.cta.goToLogin();
  }

  
}
