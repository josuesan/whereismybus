import { Component } from '@angular/core';
import { AuthService, CTAService, NotificationService } from "../../@services";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  public email: string;
  public password: string;
  public userType: string = "";

  constructor(private notificationService:NotificationService, private cta:CTAService,private authService: AuthService, private router: Router) { }

  ngOnInit(){
    
  }

  login()  {
    if (this.email != "" && this.password != "") {
      this.authService.loginUser(this.email, this.password).then((result) => {
        if (result[0] == true) this.cta.goToHome();
        else {this.notificationService.createTosty(result[1].message, false);} 
      });
    }
  }
  async init(){
    if ( await this.authService.getCurrentUser() != null) this.cta.goToHome();
  }
}

