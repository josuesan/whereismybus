import { Component } from '@angular/core';
import { CTAService } from '../../@services';

@Component({
  selector: 'app-messages',
  templateUrl: 'messages.page.html',
  styleUrls: ['messages.page.scss'],
})
export class MessagesPage {
  public userType:string = "representative";
  constructor(private cta:CTAService){}
  goHome(){
    this.cta.goToHome();
}
}
