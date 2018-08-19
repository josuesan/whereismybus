import { Component } from '@angular/core';
import { CTAService, AuthService } from '../../@services';
import { User } from "../../#interfaces";

@Component({
  selector: 'app-messages',
  templateUrl: 'messages.page.html',
  styleUrls: ['messages.page.scss'],
})
export class MessagesPage {
  public userType: string = "";
  constructor(private cta: CTAService, private authService: AuthService) { }
  
  ngOnInit(){
    this.verifyRole;
  }

  async verifyRole(){
    let currentUser = await this.authService.getCurrentUser();
    if (currentUser != null) {
      this.authService.getUserData(currentUser.uid).then((doc) => {
        if (doc.exists) this.userType = (doc.data() as User).role;
        else this.cta.goToHome();
      }).catch((err) => console.error(err));
    }
    else this.cta.goToLogin();
  }

  
  goHome() { 
    this.cta.goToHome(); 
  }
}
