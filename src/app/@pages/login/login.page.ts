import { Component } from '@angular/core';
import { AuthService } from "../../@services";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  public email: string;
  public password: string;
  public userType: string = "admin";

  constructor(private authService: AuthService, private router: Router) { }
  login() {
    if (this.email != "" && this.password != "") {
      this.authService.loginUser(this.email, this.password).then((result) => {
        if (result.user != undefined)  this.router.navigate(['/profile']);
        else console.error(result);
      });
    }
  }
}

