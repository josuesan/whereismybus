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
  public userType: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(){
    if (this.authService.getCurrentUser() != null) this.router.navigate(['/home']);
  }

  login() {
    if (this.email != "" && this.password != "") {
      this.authService.loginUser(this.email, this.password).then((result) => {
        if (result.user != undefined) this.router.navigate(['/home']);
        else console.error(result);
      });
    }
  }
}

