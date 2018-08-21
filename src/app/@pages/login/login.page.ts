import { Component } from '@angular/core';
import { AuthService, CTAService } from "../../@services";
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

  constructor(private cta:CTAService,private authService: AuthService, private router: Router) { }

  ngOnInit(){
    if (this.authService.getCurrentUser() != null) this.cta.goToHome();
  }

  login()  {
    if (this.email != "" && this.password != "") {
      this.authService.loginUser(this.email, this.password).then((result) => {
        if (result[0] == true) this.cta.goToHome();
        else console.error(result[1]);
      });
    }
  }
}

