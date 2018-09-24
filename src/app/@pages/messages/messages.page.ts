import { Component, ElementRef, ViewChild, ComponentRef, ViewContainerRef,ComponentFactoryResolver} from '@angular/core';
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
  public ready: boolean = false;
  public driver = {} as User;
  public messages: any[];
  public existMessages = -1;
  // public cpRef: ComponentRef<MessagesPage> = MessagesPage;
  constructor(private cta: CTAService, private authService: AuthService, private messageService: NotificationService) { }

  ngOnInit() {
    this.init();  
  }

  getMessages() {

    this.messageService.getMessages().then((data) => {
      this.messages = [];
      const tam = data.size;
      let i=1;
      data.forEach((doc) => {
        var message = doc.data() as Notification;
        this.authService.getUserData(message.driver).then((docUser) => {
          if (docUser.exists) {
            var driver = docUser.data() as User;
            this.messages.push({ driver: driver, data: message });
            if (i === tam) this.ready = true;
            i++;
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
        console.log("Mensaje agregado");
        this.messageService.createTosty("Message Sent.",true);
        this.cta.goToHome();
      }).catch((err) => this.messageService.createTosty(err.message, false));
    }
    else this.cta.goToLogin();
  }

  cleanHistory() {
    this.ready = false;
    this.messageService.cleanHistory().toPromise().then((res) => {
      if (res.ok){
        this.messageService.createTosty("Cleaned History.",true);
        this.ready = true;
        this.cta.goToHome();
      }
      else this.messageService.createTosty(res.text, false);
    }).catch((err) => this.messageService.createTosty(err.message, false));

  }

  goHome() {
    this.cta.goToHome();
  }
  public redirect(ruta: string) {
    // this.cpRef.destroy();
    this.cta.redirect(ruta);
  }

  erasePlaceholder(event){
    var target = event.target || event.srcElement || event.currentTarget;
    if(target.innerHTML=="Escribe un mensaje") target.innerHTML="";
  }
  setPlaceholder(event){
    var target = event.target || event.srcElement || event.currentTarget;
    if(target.innerHTML=="")  target.innerHTML="Escribe un mensaje";

  }
  async init(){
    console.log("hola");
    var currentUser = await this.authService.getCurrentUser();
    if (currentUser != null) {
      this.verifyRole(currentUser.uid);
      this.getMessages();
    } else this.cta.goToLogin();
  }
}
