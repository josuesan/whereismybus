import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: 'messages.page.html',
  styleUrls: ['messages.page.scss'],
})
export class MessagesPage {
  public userType:string = "admin";
  constructor(){}

}
