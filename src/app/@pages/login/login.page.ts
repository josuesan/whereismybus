import { Component } from '@angular/core';
import { AuthService } from "../../@services";
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  public email: string;
  public password: string;
  public userType:string = "admin";
  constructor(private authService:AuthService){}
  login(){
    this.authService.loginUser(this.email,this.password);
  }
}
