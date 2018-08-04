import { Component } from '@angular/core';
import { AuthService } from "@whereIsMyBus/services";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public email: string;
  public password: string;

  constructor(private authService:AuthService){}
  login(){
    this.authService.loginUser(this.email,this.password);
  }
}
