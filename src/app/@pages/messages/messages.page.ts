import { Component } from '@angular/core';
import { CTAService, AuthService, NotificationService } from '../../@services';
import { Notification, User } from "../../#interfaces";

@Component({
  selector: 'app-messages',
  templateUrl: 'messages.page.html',
  styleUrls: ['messages.page.scss'],
})
export class MessagesPage {
  public userType: string = "";
  public message = {} as Notification;
  
  public driver = {} as User;
  public messages: any[];

  constructor(private cta: CTAService, private authService: AuthService, private messageService: NotificationService) { }

  ngOnInit() {
    var currentUser = this.authService.getCurrentUser();
    if (currentUser != null) {
      this.verifyRole(currentUser.uid);
      this.getMessages();
    } else this.cta.goToLogin();
  }

  getMessages() {
    this.messageService.getMessages().then((data) => {
      this.messages = [];
      data.forEach((doc) => {
        var message = doc.data() as Notification;
        this.authService.getUserData(message.driver).then((docUser) => {
          if (docUser.exists) {
            var driver = docUser.data() as User;
            this.messages.push({ driver: driver, data: message });
          }
        }).catch((err) => this.messageService.createTosty(err.message, false));
      });
    }).catch((err) => this.messageService.createTosty(err.message, false));
  }

  verifyRole(uid) {
    this.authService.getUserData(uid).then((doc) => {
      if (doc.exists){
        this.driver = doc.data() as User;
        this.userType = doc.data().role;
      }
      else this.cta.goToHome();
    }).catch((err) => this.messageService.createTosty(err.message, false));
  }

  async saveNewMessage() {
    let currentUser = await this.authService.getCurrentUser();
    if (currentUser != null) {
      this.message.driver = currentUser.uid;
      
      this.messageService.addNewMessage(this.message).then((docRef) => {
        let driverActual = this.driver;
      let messageActual = this.message;
        this.messages.reverse()
        this.messages.push({driver: driverActual, data: messageActual});
        this.messages.reverse()
        console.log("Mensaje agregado");
      }).catch((err) => this.messageService.createTosty(err.message, false));
    }
    else this.cta.goToLogin();
  }

  cleanHistory() {
    this.messageService.cleanHistory().toPromise().then((res) => {
      console.log(res);
    }).catch((err) => this.messageService.createTosty(err.message, false));

  }

  goHome() {
    this.cta.goToHome();
  }
}
