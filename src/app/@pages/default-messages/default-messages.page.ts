import { Component, ElementRef, ViewChild } from '@angular/core';
import { CTAService, AuthService, NotificationService } from '../../@services';
import { Notification, User } from "../../#interfaces";

@Component({
  selector: 'app-default-messages',
  templateUrl: 'default-messages.page.html',
  styleUrls: ['default-messages.page.scss'],
})
export class DefaultMessagesPage {
  public userType: string = "busDriver";
  public message = {} as Notification;
  
  public driver = {} as User;
  public messages: any[];
  constructor(private cta: CTAService, private authService: AuthService, private messageService: NotificationService) { }

  ngOnInit() {

  }

  public redirect(ruta: string) {
    this.cta.redirect(ruta);
  }
}
